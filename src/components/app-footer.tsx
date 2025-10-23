export function AppFooter() {
  return (
    <footer className="w-full bg-secondary py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-muted-foreground">
          <div>
            <h3 className="font-bold text-lg text-foreground mb-2">About</h3>
            <p className="text-sm">
              Get free internet data across all major carriers in Bangladesh. Limited time
              promotional offer for 2025.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground mb-2">Supported Networks</h3>
            <ul className="space-y-1 text-sm">
              <li>Grameenphone</li>
              <li>Banglalink</li>
              <li>Airtel</li>
              <li>Robi</li>
              <li>Teletalk</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground mb-2">Legal</h3>
            <ul className="space-y-1 text-sm">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Disclaimer</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
          <p>&copy; {new Date().getFullYear()} Free Internet Bangladesh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
