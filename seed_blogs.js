require('dotenv').config();
const mysql = require('mysql2/promise');

const blogPosts = [
  {
    title: "Mastering 21 CFR Part 11: A Deep Dive into Electronic Signatures",
    excerpt: "Navigating FDA regulations requires robust architecture. Discover the technical foundations needed to ensure data integrity, unalterable audit trails, and seamless compliance in life sciences artwork workflows.",
    date: "Jan 24, 2026",
    author: "Artwork Team",
    category: "Compliance",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop",
    content: [
      "In the highly regulated landscape of life sciences, compliance is not just a checkbox—it's a critical infrastructure requirement. The FDA's 21 CFR Part 11 regulation sets the gold standard for electronic records and electronic signatures (ERES). However, building a system that natively adheres to these stringent requirements requires far more than simply capturing a digital signature.",
      "At the core of a Part 11 compliant architecture is the concept of a closed system environment. This necessitates rigorous authentication protocols, often leveraging enterprise-grade identity providers like Microsoft Entra ID (formerly Azure AD) to ensure that the individual signing the document is cryptographically verified. Furthermore, the system must enforce strict role-based access controls (RBAC) to guarantee that only authorized personnel can initiate, review, or approve artwork lifecycles.",
      "Equally critical is the implementation of an immutable, computer-generated audit trail. Every action—whether it's a metadata update, a file version change, or a status transition—must be recorded with a precise timestamp, the user's identity, and the exact nature of the change. By utilizing blockchain-inspired hashing algorithms and secure, append-only databases, organizations can construct audit trails that are mathematically impossible to alter, providing regulatory bodies with absolute confidence in the data's integrity.",
      "Ultimately, mastering 21 CFR Part 11 is about weaving compliance directly into the technical fabric of your operations. When your platform handles the heavy lifting of cryptographic verification and unalterable logging, your quality assurance teams can focus on what truly matters: accelerating time-to-market without compromising patient safety."
    ]
  },
  {
    title: "Architecting Secure Workflows: The Microsoft 365 Advantage",
    excerpt: "Unpacking the security model of native M365 integrations. Learn how leveraging Azure Active Directory and SharePoint infrastructure eliminates data silos and enforces enterprise-grade governance.",
    date: "Feb 18, 2026",
    author: "Artwork Team",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    content: [
      "The traditional approach to SaaS deployment often involves relying on third-party servers to host critical, pre-release intellectual property. For pharmaceutical and consumer healthcare enterprises, this introduces unacceptable security risks and creates fragmented data silos. The solution lies in architecting workflows natively within the Microsoft 365 ecosystem.",
      "By deeply integrating with Microsoft Entra ID, platforms can seamlessly inherit an organization's existing security postures, including Multi-Factor Authentication (MFA), Conditional Access policies, and Zero Trust frameworks. This means that access to highly sensitive packaging artworks is governed by the same robust security rules that protect the enterprise's core communications and financial data.",
      "Furthermore, utilizing SharePoint as the underlying document repository fundamentally changes the data ownership model. Instead of transferring files to an external vendor's cloud, the artwork assets remain firmly within the client's own tenant. This 'bring-your-own-storage' approach not only simplifies compliance and data residency requirements but also allows organizations to apply Microsoft Purview's advanced data loss prevention (DLP) and retention policies directly to their artwork files.",
      "The M365 advantage extends beyond security. By tapping into the Microsoft Graph API, workflows can intelligently connect with Teams, Outlook, and Power Automate, creating a frictionless user experience that drives adoption and accelerates the entire review and approval lifecycle."
    ]
  },
  {
    title: "AI-Driven Proofing: Automating Anomaly Detection in Labeling",
    excerpt: "From OCR to advanced computer vision models, explore how modern AI pipelines are trained to detect microscopic deviations in pharmaceutical labeling, drastically reducing review cycles.",
    date: "Mar 12, 2026",
    author: "Artwork Team",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    content: [
      "The manual review of pharmaceutical labeling is a notorious bottleneck. Comparing a dense, multi-lingual leaflet against a master copy is not only time-consuming but highly susceptible to human error. Enter AI-driven proofing—a paradigm shift that leverages advanced machine learning to automate the detection of microscopic anomalies.",
      "Modern AI proofing pipelines utilize a combination of Optical Character Recognition (OCR) and sophisticated Computer Vision (CV) models. OCR engines have evolved beyond simple text extraction; they now understand spatial relationships, font kerning, and complex tabular layouts. When combined with Natural Language Processing (NLP), these systems can dynamically compare the intended copy against the rendered artwork, flagging discrepancies such as missing warning statements, incorrect dosages, or subtle typographical errors.",
      "However, text is only half the battle. Computer Vision models are trained to perform pixel-perfect comparisons to detect graphical deviations. This includes verifying barcode integrity, ensuring correct logo placement, and identifying unintended shifts in color profiles or die-lines. By utilizing convolutional neural networks (CNNs), these models can differentiate between an intended design update and a critical printing artifact.",
      "By integrating these AI capabilities directly into the approval workflow, organizations can achieve a 'first-time-right' approach. Reviewers are guided directly to the specific areas of concern, transforming a tedious manual inspection into a rapid, high-confidence verification process."
    ]
  },
  {
    title: "Version Control: Solving the Single Source of Truth Dilemma",
    excerpt: "A technical look at cryptographic hashing and metadata management to guarantee that global packaging teams always work with the definitive, approved version of critical artwork assets.",
    date: "Apr 05, 2026",
    author: "Artwork Team",
    category: "Best Practices",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop",
    content: [
      "In the complex world of global packaging, the phrase 'single source of truth' is often used but rarely achieved. Files are downloaded, emailed, modified locally, and re-uploaded, creating a chaotic web of conflicting versions. Solving this dilemma requires a rigorous, technically enforced version control system.",
      "The foundation of robust version control is cryptographic hashing. When a new artwork asset is uploaded, the system generates a unique hash (such as SHA-256) based on the file's exact binary contents. This hash acts as an immutable digital fingerprint. Any modification to the file, no matter how microscopic, results in a completely different hash. By tracking these hashes, the system can instantly verify if a file has been tampered with or if a user is inadvertently working on an outdated version.",
      "Complementing this cryptographic foundation is dynamic metadata management. Rather than embedding critical information (such as language codes, market destinations, or SKU numbers) within the filename—a practice prone to human error—this data is abstracted into a structured, queryable database schema. This allows complex, multi-dimensional relationships to be established between the physical asset and its regulatory context.",
      "When these two technical approaches are combined, the result is a bulletproof versioning engine. Global teams can confidently collaborate, knowing that the platform is enforcing strict serialization and that the file presented on their screen is the definitive, unadulterated master copy."
    ]
  },
  {
    title: "Optimizing FDA Submissions with Structured Data Models",
    excerpt: "How transitioning from unstructured PDFs to structured data formats like XML/SPL streamlines regulatory submissions and ensures instantaneous alignment with global health authority standards.",
    date: "Apr 18, 2026",
    author: "Artwork Team",
    category: "Regulatory",
    image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=1173&auto=format&fit=crop",
    content: [
      "For decades, the pharmaceutical industry has relied on unstructured formats, primarily PDFs, for regulatory submissions. While human-readable, these documents are opaque to automated systems, making data extraction, validation, and global syndication a labor-intensive nightmare. The industry is now undergoing a critical transition toward structured data models.",
      "At the forefront of this shift is the adoption of formats like XML (eXtensible Markup Language) and specifically, the FDA's Structured Product Labeling (SPL) standard. By decoupling the content (the actual text, warnings, and dosages) from its presentation layer (the layout and formatting), structured data models allow labeling information to be treated as dynamic, machine-readable variables rather than static blocks of text.",
      "The technical benefits of this approach are profound. When labeling data is structured, it can be seamlessly integrated with global ERP and PLM systems through RESTful APIs. Regulatory submissions become rapid, automated data exchanges rather than cumbersome document uploads. Furthermore, validation against the FDA's complex business rules can occur instantaneously during the drafting phase, drastically reducing the risk of a Refusal to File (RTF).",
      "Transitioning to structured data is not merely a compliance exercise; it is a foundational upgrade to an organization's digital architecture, enabling downstream automation and unlocking the true potential of global, data-driven packaging lifecycles."
    ]
  },
  {
    title: "The Impact of Cloud-Native Architecture on Global Supply Chains",
    excerpt: "Analyzing the paradigm shift from legacy on-premise servers to cloud-native, microservices-based platforms and how it systematically accelerates global packaging rollouts.",
    date: "Apr 28, 2026",
    author: "Artwork Team",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1667984390527-850f63192709?w=500&auto=format&fit=crop",
    content: [
      "The globalization of pharmaceutical and consumer healthcare supply chains demands infrastructure that is infinitely scalable, resilient, and accessible from anywhere on the globe. Legacy on-premise servers, with their monolithic architectures and localized physical limitations, are no longer capable of meeting these demands. The solution is the wholesale adoption of cloud-native architecture.",
      "Cloud-native design is fundamentally different from simply 'hosting in the cloud.' It relies on containerization (using technologies like Docker) and orchestration (such as Kubernetes) to break down monolithic applications into agile, independent microservices. In the context of artwork management, this means that the PDF rendering engine, the AI proofing module, and the audit trail database operate autonomously. If the rendering engine experiences a spike in demand due to a massive product launch, it can scale independently without degrading the performance of the rest of the platform.",
      "Furthermore, leveraging global Content Delivery Networks (CDNs) and distributed cloud databases ensures that an associate in Tokyo experiences the exact same rapid performance as an associate in New York. Latency is minimized by caching non-sensitive assets locally and utilizing edge computing for rapid data validation.",
      "The ultimate impact of cloud-native architecture on the supply chain is speed and agility. By removing infrastructure bottlenecks and enabling continuous deployment (CI/CD) of new features, organizations can orchestrate complex, multi-national packaging rollouts with unprecedented efficiency and reliability."
    ]
  }
];

async function seed() {
    try {
        console.log('Connecting to MySQL...');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'artwork_today',
            port: process.env.DB_PORT || 3306
        });

        // clear existing blogs to prevent duplicates if run multiple times
        console.log('Clearing existing blogs...');
        await connection.query('DELETE FROM blogs');

        for (const post of blogPosts) {
            const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const content = post.content.join('\\n\\n');
            const createdAt = new Date(post.date).toISOString().slice(0, 19).replace('T', ' ');

            await connection.query(
                'INSERT INTO blogs (title, slug, content, excerpt, author, image_url, category, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [post.title, slug, content, post.excerpt, post.author, post.image, post.category, createdAt]
            );
            console.log(`Inserted: ${post.title}`);
        }

        console.log('Migration complete!');
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

seed();
