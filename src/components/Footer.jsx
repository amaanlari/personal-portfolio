import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <div className="footer-left">
                        <span className="footer-logo">MAL<span className="footer-dot"/></span>
                        <p className="footer-tagline">Backend engineer · Distributed systems · Manufacturing scale</p>
                    </div>
                    <div className="footer-links">
                        <a href="https://github.com/amaanlari" target="_blank" rel="noreferrer">GitHub</a>
                        <a href="https://linkedin.com/in/amaanlari" target="_blank" rel="noreferrer">LinkedIn</a>
                        <a href="mailto:amaanlari.official@gmail.com">Email</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© 2026 Mohammad Amaan Lari</span>
                    <span className="footer-built">Built with React · Vite</span>
                </div>
            </div>
        </footer>
    )
}
