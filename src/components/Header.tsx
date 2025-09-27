import { Button } from "@/components/ui/button";
import { Briefcase, User, FileText, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg">
            <svg className="h-8 w-8" viewBox="50 80 600 640" xmlns="http://www.w3.org/2000/svg">
              <path d="M347.74 106.52C359.37 109.92 371.53 110.07 383.36 112.37C450.61 125.44 510.47 152.63 557.01 204.37C590.46 241.57 608.84 285.06 606.24 335.81C604.02 379.14 586.31 416.16 556.95 447.55C514.83 492.58 461.93 516.41 401.41 523.95C357.36 529.43 313.94 525.79 271.53 512.16C262.99 509.42 254.99 505.38 246.94 501.46C243.92 499.99 242.67 498.11 242.67 494.58C242.79 426.01 242.77 357.45 242.79 288.88C242.79 288.16 243.02 287.43 243.3 285.8C263.17 292.7 283.36 294.55 304.59 289.93C304.59 290.81 304.59 297.85 304.59 298.73C304.59 343.85 304.74 388.98 304.41 434.1C304.36 440.22 306.56 442.81 311.78 445.01C330.41 452.81 349.91 454.26 369.68 453.35C410.76 451.46 448.25 439.14 478.63 410.74C520.03 372.04 537.12 324.58 522.65 268.69C514.17 235.94 491.51 212.4 465.07 192.68C425.33 163.04 379.92 147.1 331.63 137.89C300.16 131.88 268.63 128.49 236.59 130.18C211.1 131.52 186.18 135.99 161.65 142.81C159.09 143.53 156.66 144.66 153.43 143.24C184.78 127.68 217.68 118.65 251.5 112.43C264.08 110.13 277 110.03 289.38 106.52C301.05 106.52 336.07 106.52 347.74 106.52Z" fill="hsl(var(--primary))" />
              <path d="M33.24 341.88C32.57 328.93 33.39 315.95 35.67 303.18C38.18 289.16 39.67 281.34 40.14 279.73C57.59 219 98.14 180.28 156.51 158.98C185 148.59 213.98 144 252.68 142.95C249.15 145.99 244.72 145.81 240.75 146.87C197.14 158.41 157.47 177.93 129.4 213.79C93.66 259.42 85.27 311.96 103.47 366.96C127.97 441.06 179.87 489.63 251.63 517.71C300.96 537.01 352.28 542.84 404.93 537.83C406.41 537.69 407.9 537.54 409.39 537.48C410.09 537.45 410.8 537.6 413.57 537.87C399.37 542.7 386.59 545.33 373.82 547.87C359.17 550.78 344.43 553.23 329.5 554.21C328.65 554.27 327.86 554.99 327.04 555.4C320.31 555.4 266.44 555.4 259.71 555.4C258.84 553.15 256.78 553.96 255.22 553.76C227.97 550.23 201.33 544.18 176.15 533.02C106.2 502.04 58.11 451.79 38.93 376.24C38.84 375.91 38.55 374.58 38.05 372.24C35.2 358.87 33.42 345.28 32.71 331.62C32.61 329.78 33.35 343.94 33.24 341.88Z" fill="hsl(var(--muted-foreground))" />
              <path d="M280.09 278.82C257.36 278.05 236.88 270.54 222.01 251.54C204.18 228.79 209.49 199.8 233.88 184.44C262.69 166.28 306.66 173.28 328.4 199.48C351.68 227.51 339.71 264.28 303.63 275.39C299.61 276.63 295.44 277.52 291.28 278.17C287.85 278.69 284.33 278.6 280.09 278.82" fill="hsl(var(--primary))" />
            </svg>
          </div>
          <span className="text-xl font-bold text-foreground">PortalPrácticas</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
              isActive("/") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            Inicio
          </Link>
          <Link
            to="/practices"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
              isActive("/practices") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            Prácticas
          </Link>
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
              isActive("/dashboard") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            }`}
          >
            <User className="h-4 w-4" />
            Panel
          </Link>
          <Link
            to="/logs"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
              isActive("/logs") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            }`}
          >
            <FileText className="h-4 w-4" />
            Registros Diarios
          </Link>
        </nav>

        <Button variant="outline" size="sm">
          <User className="h-4 w-4" />
          Perfil
        </Button>
      </div>
    </header>
  );
};

export default Header;