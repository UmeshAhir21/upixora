import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { validateFile } from '@/lib/validation';
import { rateLimit } from '@/lib/rate-limit';
import { getMimeType, getFileExtension, type OutputFormat } from '@/lib/format-utils';

export const runtime = 'nodejs';
export const maxDuration = 30;

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
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
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': '60',
          },
        }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const format = formData.get('format') as OutputFormat;
    const quality = formData.get('quality') ? parseInt(formData.get('quality') as string, 10) : undefined;
    const width = formData.get('width') ? parseInt(formData.get('width') as string, 10) : undefined;
    const height = formData.get('height') ? parseInt(formData.get('height') as string, 10) : undefined;
    const backgroundColor = formData.get('backgroundColor') as string | null;

    // Validate file
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Validate format
    if (!format) {
      return NextResponse.json({ error: 'Output format is required' }, { status: 400 });
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Initialize Sharp
    let sharpInstance = sharp(buffer);

    // Handle SVG (convert to raster)
    if (file.type === 'image/svg+xml') {
      sharpInstance = sharpInstance.resize(width || 1000, height || 1000);
    }

    // Resize if dimensions provided
    if (width || height) {
      sharpInstance = sharpInstance.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Convert format
    let convertedBuffer: Buffer;
    const mimeType = getMimeType(format);
    const options: sharp.OutputOptions = {};

    switch (format) {
      case 'jpg':
      case 'jpeg':
        if (backgroundColor) {
          sharpInstance = sharpInstance.flatten({ background: backgroundColor });
        }
        convertedBuffer = await sharpInstance
          .jpeg({ quality: quality || 90, ...options })
          .toBuffer();
        break;

      case 'png':
        convertedBuffer = await sharpInstance
          .png({ quality: quality ? Math.floor(quality / 10) : undefined, ...options })
          .toBuffer();
        break;

      case 'webp':
        convertedBuffer = await sharpInstance
          .webp({ quality: quality || 90, ...options })
          .toBuffer();
        break;

      case 'avif':
        convertedBuffer = await sharpInstance
          .avif({ quality: quality || 80, ...options })
          .toBuffer();
        break;

      case 'gif':
        convertedBuffer = await sharpInstance
          .gif({ ...options })
          .toBuffer();
        break;

      case 'bmp':
        convertedBuffer = await sharpInstance
          .bmp({ ...options })
          .toBuffer();
        break;

      case 'tiff':
        convertedBuffer = await sharpInstance
          .tiff({ quality: quality || 90, ...options })
          .toBuffer();
        break;

      default:
        return NextResponse.json({ error: 'Unsupported output format' }, { status: 400 });
    }

    // Return converted image
    return new NextResponse(convertedBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="converted.${getFileExtension(format)}"`,
        'Content-Length': convertedBuffer.length.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      },
    });
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert image. Please try again.' },
      { status: 500 }
    );
  }
}
