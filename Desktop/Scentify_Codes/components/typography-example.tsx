export function TypographyExample() {
  return (
    <div className="space-y-8 p-8 bg-background rounded-lg border">
      <div>
        <h1 className="mb-2">Heading 1 - Playfair Display</h1>
        <p className="text-muted-foreground">Used for main page titles and hero sections</p>
      </div>

      <div>
        <h2 className="mb-2">Heading 2 - Playfair Display</h2>
        <p className="text-muted-foreground">Used for section titles and product category headings</p>
      </div>

      <div>
        <h3 className="mb-2">Heading 3 - Playfair Display</h3>
        <p className="text-muted-foreground">Used for subsection titles and product names</p>
      </div>

      <div>
        <h4 className="mb-2">Heading 4 - Playfair Display</h4>
        <p className="text-muted-foreground">Used for card titles and smaller sections</p>
      </div>

      <div>
        <p className="mb-2">Body Text - Lora</p>
        <p className="text-muted-foreground">
          This is the main body text used throughout the site. Lora provides an elegant serif look that enhances the
          luxury feel while maintaining excellent readability.
        </p>
      </div>

      <div>
        <p className="subtitle mb-2">Subtitle Text - Lora Italic</p>
        <p className="text-muted-foreground">Used for supporting text and product descriptions</p>
      </div>

      <div>
        <p className="overline mb-2">OVERLINE TEXT - MONTSERRAT</p>
        <p className="text-muted-foreground">Used for labels, categories, and small headers</p>
      </div>

      <div>
        <button className="cta-text bg-leaf-green text-white px-6 py-3 rounded-md">SHOP NOW</button>
        <p className="text-muted-foreground mt-2">Call-to-action buttons use Montserrat for a clean, modern look</p>
      </div>

      <div>
        <p className="quote mb-2">"The essence of luxury is not in excess, but in the quality of the experience."</p>
        <p className="text-muted-foreground">Quotes use Playfair Display Italic for an elegant touch</p>
      </div>

      <div>
        <p className="product-name mb-1">Midnight Orchid</p>
        <p className="price mb-2">$129.99</p>
        <p className="text-muted-foreground">Product names use Playfair Display, prices use Montserrat</p>
      </div>

      <div>
        <p className="caption mb-2">Limited edition - Only 50 bottles available</p>
        <p className="text-muted-foreground">Captions use Lora Italic for a subtle emphasis</p>
      </div>
    </div>
  )
}

