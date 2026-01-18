# Image Converter - Production-Ready Next.js Application

A fast, SEO-optimized, Google AdSense-compliant image converter web application built with Next.js 14 (App Router), TypeScript, and Sharp.

## 🚀 Features

- **Multiple Format Support**: Convert between JPG, PNG, WEBP, AVIF, TIFF, and SVG
- **Batch Processing**: Convert multiple images simultaneously
- **Advanced Options**: Quality adjustment, resizing, background color selection
- **SEO Optimized**: Complete metadata, structured data, sitemap, and robots.txt
- **Google AdSense Ready**: Cookie consent, ad placeholders, compliant layout
- **Secure**: Server-side processing, rate limiting, file validation
- **Fast**: Optimized for Core Web Vitals
- **Mobile-First**: Responsive design with dark mode support

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd img
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   ```env
   RATE_LIMIT_MAX_REQUESTS=10
   RATE_LIMIT_WINDOW_MS=60000
   NEXT_PUBLIC_ADSENSE_ID=your-adsense-id
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── convert/      # Image conversion endpoint
│   ├── blog/             # Blog pages
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── privacy/          # Privacy policy
│   ├── terms/            # Terms & conditions
│   ├── disclaimer/       # Disclaimer
│   ├── [format-pages]/   # Format-specific converter pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── sitemap.ts        # Sitemap generation
│   └── robots.ts         # Robots.txt generation
├── components/           # React components
│   ├── image-converter.tsx
│   ├── bulk-image-converter.tsx
│   ├── navigation.tsx
│   ├── footer.tsx
│   ├── cookie-consent.tsx
│   ├── ad-placeholder.tsx
│   └── structured-data.tsx
├── lib/                  # Utility libraries
│   ├── types.ts
│   ├── format-utils.ts
│   ├── validation.ts
│   └── rate-limit.ts
├── utils/                # Helper functions
│   └── cn.ts
└── public/              # Static assets
```

## 🎯 Available Pages

- `/` - Home page with main converter
- `/jpg-to-png` - JPG to PNG converter
- `/png-to-jpg` - PNG to JPG converter
- `/webp-to-jpg` - WEBP to JPG converter
- `/png-to-webp` - PNG to WEBP converter
- `/image-to-avif` - Image to AVIF converter
- `/bulk-image-converter` - Batch conversion tool
- `/blog` - Blog page
- `/about` - About us page
- `/contact` - Contact page
- `/privacy` - Privacy policy
- `/terms` - Terms & conditions
- `/disclaimer` - Disclaimer

## 🔧 Configuration

### Rate Limiting

Configure rate limiting in `.env`:
- `RATE_LIMIT_MAX_REQUESTS`: Maximum requests per window (default: 10)
- `RATE_LIMIT_WINDOW_MS`: Time window in milliseconds (default: 60000)

### Google AdSense

1. Get your AdSense Publisher ID
2. Add it to `.env` as `NEXT_PUBLIC_ADSENSE_ID`
3. Update `components/ad-placeholder.tsx` with your ad code

### Site URL

Set `NEXT_PUBLIC_SITE_URL` to your production domain for proper SEO metadata.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- Detect Next.js
- Build and optimize your app
- Deploy with edge functions

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Use Next.js plugin
- **AWS Amplify**: Connect your repository
- **Docker**: Use the included Dockerfile (if provided)
- **Self-hosted**: Run `npm run build && npm start`

## 🔒 Security Features

- **Server-side processing**: All conversions happen on the server
- **File validation**: MIME type and size validation
- **Rate limiting**: Prevents abuse
- **No storage**: Files are deleted immediately after processing
- **Input sanitization**: Zod schema validation

## 📊 SEO Features

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Structured data (Schema.org)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Semantic HTML

## 🎨 Customization

### Styling

The app uses Tailwind CSS. Customize colors and styles in `tailwind.config.ts`.

### Adding New Formats

1. Update `lib/types.ts` with new format types
2. Add format to `lib/format-utils.ts`
3. Update Sharp conversion logic in `app/api/convert/route.ts`

### Adding New Pages

1. Create a new directory in `app/`
2. Add `page.tsx` with metadata
3. Update `app/sitemap.ts` and navigation

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email contact@example.com or open an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Sharp
