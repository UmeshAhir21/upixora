import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 60;

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

function getMimeType(format: string): string {
  const mimeTypes: Record<string, string> = {
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    pdf: 'application/pdf',
    txt: 'text/plain',
    xml: 'application/xml',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    csv: 'text/csv',
  };
  return mimeTypes[format.toLowerCase()] || 'application/octet-stream';
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    const rateLimitResult = rateLimit(ip);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': '60',
          },
        }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const from = formData.get('from') as string;
    const to = formData.get('to') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!from || !to) {
      return NextResponse.json({ error: 'Conversion format is required' }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 50MB' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const conversionType = `${from.toLowerCase()}-${to.toLowerCase()}`;

    let convertedBuffer: Buffer;
    const mimeType = getMimeType(to);

    try {
      switch (conversionType) {
        case 'pdf-txt': {
          const pdfParse = (await import('pdf-parse')).default;
          const data = await pdfParse(buffer);
          convertedBuffer = Buffer.from(data.text, 'utf-8');
          break;
        }

        case 'pdf-doc':
        case 'pdf-docx': {
          // Extract text from PDF
          const pdfParse = (await import('pdf-parse')).default;
          const pdfData = await pdfParse(buffer);
          const textContent = pdfData.text;
          
          // Create DOC/DOCX file from extracted text
          const { Document, Packer, Paragraph, TextRun } = await import('docx');
          const doc = new Document({
            sections: [{
              properties: {},
              children: textContent.split('\n').filter(line => line.trim()).map((line: string) => 
                new Paragraph({
                  children: [new TextRun(line || ' ')],
                })
              ),
            }],
          });
          convertedBuffer = await Packer.toBuffer(doc);
          break;
        }

        case 'txt-doc':
        case 'txt-docx': {
          const { Document, Packer, Paragraph, TextRun } = await import('docx');
          const textContent = buffer.toString('utf-8');
          const doc = new Document({
            sections: [{
              properties: {},
              children: textContent.split('\n').map((line: string) => 
                new Paragraph({
                  children: [new TextRun(line || ' ')],
                })
              ),
            }],
          });
          convertedBuffer = await Packer.toBuffer(doc);
          break;
        }

        case 'xml-txt': {
          const { XMLParser } = await import('fast-xml-parser');
          const parser = new XMLParser();
          const xmlContent = buffer.toString('utf-8');
          const jsonObj = parser.parse(xmlContent);
          const textContent = JSON.stringify(jsonObj, null, 2);
          convertedBuffer = Buffer.from(textContent, 'utf-8');
          break;
        }

        case 'xml-doc':
        case 'xml-docx': {
          const { Document, Packer, Paragraph, TextRun } = await import('docx');
          const { XMLParser } = await import('fast-xml-parser');
          const parser = new XMLParser();
          const xmlContent = buffer.toString('utf-8');
          const jsonObj = parser.parse(xmlContent);
          const textContent = JSON.stringify(jsonObj, null, 2);
          
          const doc = new Document({
            sections: [{
              properties: {},
              children: textContent.split('\n').map((line: string) => 
                new Paragraph({
                  children: [new TextRun(line || ' ')],
                })
              ),
            }],
          });
          convertedBuffer = await Packer.toBuffer(doc);
          break;
        }

        case 'docx-txt':
        case 'doc-txt': {
          const mammoth = (await import('mammoth')).default;
          const result = await mammoth.extractRawText({ buffer });
          convertedBuffer = Buffer.from(result.value, 'utf-8');
          break;
        }

        case 'xlsx-csv':
        case 'xls-csv': {
          const XLSX = await import('xlsx');
          const workbook = XLSX.read(buffer, { type: 'buffer' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const csv = XLSX.utils.sheet_to_csv(worksheet);
          convertedBuffer = Buffer.from(csv, 'utf-8');
          break;
        }

        case 'csv-xls':
        case 'csv-xlsx': {
          const XLSX = await import('xlsx');
          const csvContent = buffer.toString('utf-8');
          const workbook = XLSX.utils.book_new();
          const worksheet = XLSX.utils.aoa_to_sheet(
            csvContent.split('\n').map((line: string) => line.split(','))
          );
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
          const writeBuffer = XLSX.write(workbook, { type: 'buffer', bookType: to === 'xls' ? 'xls' : 'xlsx' });
          convertedBuffer = Buffer.isBuffer(writeBuffer) ? writeBuffer : Buffer.from(writeBuffer);
          break;
        }

        case 'xls-xlsx':
        case 'xlsx-xls': {
          const XLSX = await import('xlsx');
          const workbook = XLSX.read(buffer, { type: 'buffer' });
          const writeBuffer = XLSX.write(workbook, { type: 'buffer', bookType: to === 'xls' ? 'xls' : 'xlsx' });
          convertedBuffer = Buffer.isBuffer(writeBuffer) ? writeBuffer : Buffer.from(writeBuffer);
          break;
        }

        default:
          return NextResponse.json(
            { error: `Conversion from ${from.toUpperCase()} to ${to.toUpperCase()} is not yet supported.` },
            { status: 400 }
          );
      }

      return new NextResponse(convertedBuffer as unknown as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Content-Disposition': `attachment; filename="converted.${to}"`,
          'Content-Length': convertedBuffer.length.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      });
    } catch (conversionError) {
      console.error('Conversion error:', conversionError);
      return NextResponse.json(
        { error: `Failed to convert ${from.toUpperCase()} to ${to.toUpperCase()}. The file may be corrupted or in an unsupported format.` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('File conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert file. Please try again.' },
      { status: 500 }
    );
  }
}
