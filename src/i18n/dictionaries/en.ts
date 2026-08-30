import type { Dictionary } from "../dictionaries";

const en: Dictionary = {
  brand: {
    name: "Zahavi - Pretty & Co. Law Offices",
    short: "Zahavi - Pretty & Co.",
    tagline: "Professional, personal and precise legal representation",
  },
  meta: {
    defaultTitle: "Zahavi - Pretty & Co. Law Offices | Professional Legal Representation",
    defaultDescription:
      "Zahavi - Pretty & Co. Law Offices provides comprehensive legal counsel in family, real estate, labor, commercial and litigation law. Initial consultation, high availability and a personal approach for every client.",
    keywords: [
      "lawyer",
      "law firm",
      "legal advice",
      "family law",
      "real estate",
      "labor law",
      "litigation",
      "commercial lawyer",
    ],
  },
  nav: {
    home: "Home",
    about: "About",
    practiceAreas: "Practice Areas",
    team: "Our Team",
    publications: "Publications & Media",
    contact: "Contact",
    cta: "Book a Meeting",
    skipToContent: "Skip to main content",
    menu: "Menu",
    faq: "FAQ",
    careers: "Careers",
    breadcrumb: "Breadcrumb",
  },
  home: {
    hero: {
      eyebrow: "Law Offices",
      title: "By your side, every step of the way",
      subtitle:
        "Zahavi - Pretty & Co. combines extensive legal experience with professional depth, strategic thinking and the personal involvement of the partners in every case, guiding you with confidence in every field and at every stage - from the first meeting to the desired result.",
      ctaPrimary: "Book a consultation",
      ctaSecondary: "Our practice areas",
    },
    stats: [
      { value: "30+", label: "Years of experience" },
      { value: "1,500+", label: "Satisfied clients" },
      { value: "24/6", label: "Availability" },
    ],
    clients: {
      title: "Among Our Clients",
      items: [
        { name: "Sela", logo: "/clients/sela.webp" },
        { name: "Jacobs Farm", logo: "/clients/jacobs-farm.webp" },
        { name: "Burgeranch", logo: "/clients/burgeranch.webp" },
        { name: "Tiv Taam", logo: "/clients/tiv-taam.webp" },
        { name: "Beinleumi TECH", logo: "/clients/beinleumi-tech.webp" },
        { name: "Prytek", logo: "/clients/prytek.webp" },
        { name: "Agudat Lechem", logo: "/clients/agudat-lechem.webp" },
      ],
    },
    intro: {
      eyebrow: "Why choose Zahavi - Pretty & Co.",
      title: "Accumulated experience, personal partner attention",
      body: "Zahavi - Pretty & Co. provides its clients with broad, multidisciplinary legal counsel, guiding companies, businesses, families and private individuals through every legal juncture - from litigation and business advisory, through real estate and labor law, to family law, wills and estates. The firm is led by two founding partners, members of the Israel Bar Association since 1996, who are personally involved in every case - both strategically and tactically - from start to finish.",
      features: [
        {
          title: "Experience since 1996",
          body: "Three decades of courtroom representation and negotiation in complex civil, commercial and business matters.",
        },
        {
          title: "Personal partner involvement",
          body: "Every case is handled personally and closely by one of the founding partners, from initial strategy to final outcome.",
        },
        {
          title: "Multidisciplinary perspective",
          body: "An answer to every legal need across the firm's practice areas, drawing on deep familiarity with each one and a complete view of your matter.",
        },
        {
          title: "Uncompromising availability",
          body: "Fast responses, clear communication and full commitment to your interests throughout the entire process.",
        },
      ],
    },
    practiceTeaser: {
      eyebrow: "Practice Areas",
      title: "Broad expertise under one roof",
      body: "A range of professional legal services, for individuals and businesses, with one personal and comprehensive approach.",
      cta: "View all practice areas",
    },
    ctaBand: {
      title: "Have a legal question? You don't have to face it alone.",
      body: "Leave your details and we'll get back to you to schedule an initial consultation, in full confidence.",
      cta: "Book a meeting",
    },
  },
  practiceAreas: {
    eyebrow: "Practice Areas",
    title: "Our practice areas",
    subtitle:
      "The firm provides full legal support across a range of fields. Select an area to learn more about the service we offer.",
    learnMore: "Learn more",
    backToAll: "Back to all areas",
    inThisArea: "What we do in this area",
    faqTitle: "Frequently Asked Questions",
    needHelp: "Need advice in this area?",
    items: [
      {
        slug: "litigation",
        title: "Civil & Commercial Litigation",
        summary: "Managing complex civil and commercial claims at every court level, representing clients in business disputes and enforcing rights in court.",
        description:
          "A lawsuit or commercial dispute demands professional, strategic representation from the very first moment. The firm handles complex civil and commercial proceedings at every level - with meticulous preparation, a strategy tailored to the client's needs, and a partner personally present throughout the process to achieve the best possible outcome - by settlement or judgment. Involved in a dispute? Plaintiff or defendant? Don't wait - contact us now and we will assess the options together.",
        points: [
          "Contractual, monetary and tort claims",
          "Representation and management of commercial disputes between partners and shareholders",
          "Applications for interim relief, attachments and injunctions",
          "Representation in mediation and arbitration",
        ],
        faq: [
          {
            q: "What is the difference between civil litigation, arbitration and mediation?",
            a: "Civil litigation takes place in court and ends with a binding judgment. Mediation is a voluntary process in which a neutral third party helps the parties reach an agreement. Arbitration is conducted outside court before an agreed arbitrator. Each has advantages depending on the circumstances.",
          },
          {
            q: "What is an injunction and when is one sought?",
            a: "An injunction is a temporary order requiring the opposing party to refrain from a specific action until the case is decided. It is sought when there is concern about irreversible harm - for example, the sale of a disputed asset, breach of a confidentiality agreement, or ongoing infringement of rights.",
          },
          {
            q: "How long does a court proceeding take?",
            a: "The duration depends on the complexity of the case and the conduct of the parties. Simple claims may conclude within one to two years; complex cases can take longer. In many cases it is possible to reach a settlement outside court in a shorter timeframe.",
          },
          {
            q: "Who pays legal costs?",
            a: "The court typically orders the losing party to pay legal costs, but the amount is at the court's discretion and does not necessarily cover all attorney's fees in full.",
          },
          {
            q: "Can I sue even without a written contract?",
            a: "Yes. An oral agreement is as binding as a written one, though it is harder to prove its terms. The court will consider evidence such as correspondence, witness testimony and payments made.",
          },
        ],
      },
      {
        slug: "labor-law",
        title: "Labor Law",
        summary: "Representing employees and employers, guiding individuals and companies through legal proceedings at all levels, employment agreements and protecting your rights when violated.",
        description:
          "Dismissal, a pre-termination hearing, unpaid wages? These are stressful events that demand a fast and precise response. Our firm represents employees and employers at all levels - guiding companies and individuals through proceedings, employment agreements and labor disputes, with a partner personally involved in every case. Unsure of your rights? Feel your rights have been violated? Need legal advice? Don't wait - leave your details now and we will get back to you promptly.",
        points: [
          "Guidance through hearings, dismissals and labor disputes",
          "Claims for rights, compensation and social benefits",
          "Drafting employment, confidentiality and non-compete agreements",
          "Dismissals during reserve duty, pregnancy or workplace discrimination",
        ],
        faq: [
          {
            q: "What is a pre-termination hearing and why does it matter?",
            a: "A pre-termination hearing is a mandatory procedure before any dismissal, in which the employer must allow the employee to state their case. A hearing conducted unlawfully may render the dismissal invalid. Early preparation with a lawyer can change the outcome.",
          },
          {
            q: "Am I entitled to severance pay?",
            a: "As a general rule, an employee who has worked more than one year with the same employer is entitled to severance pay. There are exceptions and grounds for dismissal that affect entitlement. A review of your employment circumstances will allow us to give you a precise answer.",
          },
          {
            q: "I was dismissed during pregnancy - what are my rights?",
            a: "Dismissal during pregnancy without approval from the Ministry of Labor is generally completely prohibited. An employee dismissed in this situation may seek cancellation of the dismissal and compensation. It is important to seek legal advice immediately upon receiving notice of dismissal.",
          },
          {
            q: "I was dismissed after returning from reserve duty - is that lawful?",
            a: "The law prohibits dismissal of an employee within 30 days of completing reserve service, without special approval. Dismissal during this period is presumed to be unlawful. Contact us to have the circumstances examined.",
          },
          {
            q: "How long do I have to file a claim?",
            a: "Claims for wrongful dismissal, wage withholding and social benefits are subject to limitation periods ranging from one to seven years, depending on the type of claim. The sooner you act, the better the prospects for preserving evidence and options.",
          },
        ],
      },
      {
        slug: "real-estate",
        title: "Real Estate",
        summary: "Sale and purchase transactions, title due diligence, real estate contracts, urban renewal and property taxation.",
        description:
          "A real estate transaction is often the most significant financial decision of a person's life - and therefore requires meticulous legal guidance at every stage. The firm guides buyers, sellers and developers from the initial title check through to final registration at the Land Registry, with a partner personally involved in every deal. Buying or selling a property? Have questions about real estate? Contact us and we will be glad to guide you.",
        points: [
          "Guidance in the sale and purchase of apartments and commercial properties",
          "Title due diligence and registration with the Land Registry and Israel Land Authority",
          "Urban renewal projects - TAMA 38 and evacuation-reconstruction",
          "Tax planning and real estate taxation aspects of the deal",
        ],
        faq: [
          {
            q: "What should I check before buying an apartment?",
            a: "Before signing a contract you should verify: the property's registration at the Land Registry, absence of liens and encumbrances, building permits, debts to the local authority, building rights and planning status. A lawyer who carries out these checks protects you from unwelcome surprises after the purchase.",
          },
          {
            q: "What is the difference between TAMA 38 and evacuation-reconstruction?",
            a: "TAMA 38 is a programme for strengthening existing buildings against earthquakes while adding floors. Evacuation-reconstruction involves demolishing the existing building and constructing a new, larger one. In both cases residents receive a new, improved apartment, but the contracts with the developer require close legal supervision.",
          },
          {
            q: "What is betterment tax and who pays it?",
            a: "Betterment tax (mas shevah) is a tax on the profit from selling real estate. It is generally paid by the seller, though there are exemptions - for example on the sale of a qualifying residential apartment. It is worth assessing the situation before signing.",
          },
          {
            q: "At what stage should a lawyer get involved in a real estate deal?",
            a: "At the negotiation stage, before signing. Early involvement allows problems to be identified before you commit, the contract to be drafted in a way that protects your interests, and the tax aspects to be properly planned.",
          },
        ],
      },
      {
        slug: "commercial",
        title: "Commercial & Corporate",
        summary: "Company formation, commercial contracts, ongoing counsel and deals.",
        description:
          "Behind every successful business stands a solid legal foundation. The firm guides companies, entrepreneurs and business owners from formation through growth - drafting contracts, founders' agreements, ongoing management and commercial transactions. Looking for a lawyer for your business? Contact us and we will define your needs together.",
        points: [
          "Formation of companies, partnerships and founders' agreements",
          "Drafting commercial contracts and engagement agreements",
          "Guidance through transactions, investments and mergers",
          "Ongoing legal counsel (retainer) for businesses",
        ],
        faq: [
          {
            q: "What is the difference between a limited company and a partnership?",
            a: "A limited company (Ltd.) is a separate legal entity from its owners - the personal liability of shareholders is limited to the capital they invested. A partnership, by contrast, does not limit personal liability, and partners may bear personal responsibility for debts. For most businesses a limited company is preferable, but the choice depends on the structure and operational needs.",
          },
          {
            q: "Why is it important to draft a founders' agreement at the outset?",
            a: "A founders' agreement sets the rules of the game from day one: share allocation, decision-making authority, what happens if a founder leaves, and exit and buy-out mechanisms. Without one, future disputes between partners can paralyse the company - and sometimes bring its operations to a halt entirely.",
          },
          {
            q: "What does ongoing legal counsel (retainer) include?",
            a: "Ongoing counsel gives you direct access to a lawyer for your business's day-to-day needs - reviewing contracts, answering legal questions, accompanying negotiations and early warning of legal risks. It is an investment that saves the higher costs of dealing with problems that could have been prevented.",
          },
          {
            q: "What should I check in a contract with a supplier or client?",
            a: "Critical aspects include: payment terms and deadlines, limitation-of-liability clauses, dispute resolution mechanisms, termination conditions, confidentiality and non-compete provisions - and above all, clear definitions of each party's obligations. A contract written in vague terms is a recipe for conflict.",
          },
        ],
      },
      {
        slug: "wills-estates",
        title: "Wills & Estates",
        summary: "Drafting wills, probate orders, estate administration and disputes.",
        description:
          "Proper planning of the transfer of assets between generations brings peace of mind and prevents disputes. The firm drafts wills, handles inheritance and probate proceedings, and represents clients in disputes - with sensitivity to the family and to the testator's wishes.",
        points: [
          "Drafting wills and agreements between heirs",
          "Obtaining inheritance and probate orders",
          "Estate administration and representation of estate administrators",
          "Representation in objections and inheritance disputes",
        ],
        faq: [
          {
            q: "Does a will have to be in writing?",
            a: "The law recognises four types of will: handwritten, witnessed, before an authority, and oral (in special circumstances only). The most common and secure form is a witnessed will - a written document signed in the presence of two witnesses. Professional drafting by a lawyer ensures the will is valid and resistant to future challenge.",
          },
          {
            q: "What is the difference between an inheritance order and a probate order?",
            a: "An inheritance order is issued when a person dies without a will - the court determines the heirs according to law. A probate order validates an existing will and gives it binding legal force. Both orders are required for the transfer of assets and registration at the Land Registry.",
          },
          {
            q: "Who can contest a will?",
            a: "Anyone who would have been entitled to inherit had there been no will - a statutory heir - may file an objection to its probate. Common grounds include formal defects, undue influence, lack of legal capacity at the time the will was made, or a claim that the will does not reflect the deceased's true wishes.",
          },
          {
            q: "How long does it take to obtain an inheritance order?",
            a: "In straightforward cases - typically several months from filing the application with the Registrar of Inheritance Affairs. When there are disputes between heirs, or when an objection to a will is filed, the process may take years. Early engagement with a lawyer allows the process to be streamlined.",
          },
        ],
      },
      {
        slug: "family-law",
        title: "Family Law",
        summary: "Prenuptial agreements, mediation and comprehensive legal guidance through proceedings.",
        description:
          "Family law requires a rare combination of legal professionalism and human sensitivity. The firm guides clients through proceedings, handles division of property, mediation and prenuptial agreements - aiming for the fairest and calmest solution for you and your children.",
        points: [
          "Guiding clients through legal proceedings",
          "Mediation",
          "Prenuptial agreements and cohabitation agreements",
          "Strategic management of property division and balancing of resources between spouses",
        ],
        faq: [
          {
            q: "Does a prenuptial agreement require court approval?",
            a: "Yes. A prenuptial agreement must be approved by a family court or a notary before it acquires binding legal force. Professional drafting is essential - agreements prepared without legal advice may be invalid or produce unintended consequences.",
          },
          {
            q: "What is the advantage of mediation over court proceedings?",
            a: "Mediation allows the parties to reach agreements quietly and with less hostility, while preserving a functional relationship - especially important when there are shared children. It is faster, more efficient, less expensive, and its outcomes are controlled by the parties rather than left to a judge's discretion.",
          },
          {
            q: "How is property divided in a divorce?",
            a: "In Israel the principle of \"resource balancing\" applies - assets accumulated during the marriage are divided equally between the parties, except for inheritances and personal gifts received. This mechanism applies at the end of the marriage, unless a prenuptial agreement sets out a different arrangement.",
          },
          {
            q: "What can be determined in a prenuptial agreement?",
            a: "Almost every financial aspect of the marriage: separation of assets, maintenance arrangements in the event of separation, division of specific assets, pension rights and more. A prenuptial agreement can be made before or during the marriage, and gives both parties certainty and security.",
          },
        ],
      },
    ],
  },
  about: {
    eyebrow: "About the Firm",
    title: "Senior, personal and multidisciplinary legal counsel",
    lead: "Zahavi - Pretty & Co. Law Offices is a boutique firm providing clients - companies, business owners, families and individuals - with senior, personal legal representation across a broad range of legal fields.",
    storyTitle: "About the firm",
    body: [
      "The firm is led by Ron Zahavi, Adv. and Anat Zahavi, Adv., two founding partners and members of the Israel Bar Association since 1996, with a combined experience of over three decades. We believe quality legal representation requires the personal involvement of a partner in every case - both strategically and tactically - rather than being passed between staff along the way.",
      "Daily engagement across a wide range of legal fields is one of the firm's key strengths: complex civil-commercial litigation, guiding companies and businesses in commercial and corporate matters, real estate in all its aspects, labor law from the employer's perspective, as well as family law and wills and estates. This broad perspective allows us to understand every dispute or transaction in its full context, and to build the right strategy for each client.",
      "Among the firm's clients, past and present, are some of the largest and best-known companies in the Israeli economy - in food and fast-food retail, telecom and hi-tech, import and export, construction and industry - alongside business people, private individuals and families seeking professional guidance through significant moments in their lives. Every client, large or small, receives the same level of commitment, availability and professionalism.",
    ],
    milestonesTitle: "The firm in numbers",
    milestones: [
      { value: "30+", label: "Years of experience" },
      { value: "1,500+", label: "Clients" },
      { value: "1996", label: "The year the firm was founded" },
    ],
    teamTitle: "Our attorneys and their qualifications",
    teamIntro:
      "Both founding partners personally handle every case at the firm. These are the qualifications and experience they bring.",
    barAdmissionLabel: "Member of the Israel Bar since",
    educationLabel: "Education",
    credentialsLabel: "Qualifications and certifications",
    membershipsLabel: "Professional memberships",
    languagesLabel: "Languages",
    practiceTitle: "What we handle",
    practiceIntro:
      "Six practice areas, each led by a partner with direct experience in it. Select an area to read more.",
    valuesTitle: "The values that lead us",
    values: [
      {
        title: "Accumulated Experience",
        body: "Over three decades of representation before every court and tribunal, and of negotiating complex matters.",
      },
      {
        title: "Personal Partner Involvement",
        body: "Every case is personally guided by one of the founding partners, from start to finish.",
      },
      {
        title: "Multidisciplinary Perspective",
        body: "Combining litigation, corporate and commercial law, real estate, labor law and family law.",
      },
      {
        title: "Trust & Transparency",
        body: "Clear fee agreements up front, honest communication and follow-through on what we promise.",
      },
    ],
    faqTitle: "Questions about the firm",
    faq: [
      {
        q: "Where is the office located?",
        a: "The firm is located at Beit Gibor Sport, Menachem Begin 7, Ramat Gan, floor 23. There is parking in the building, and the office is accessible by public transport via the Savidor Center and Bnei Brak railway stations.",
      },
      {
        q: "Which areas of law does the firm handle?",
        a: "Six areas: civil and commercial litigation, labor law from the employer's side, real estate, commercial and corporate law, wills and estates, and family law.",
      },
      {
        q: "Who will handle my case?",
        a: "One of the two founding partners handles every case personally, from the first meeting through to the conclusion of proceedings. Litigation, commercial, real estate and estate matters are handled by Ron Zahavi, Adv.; labor law matters by Anat Zahavi, Adv.",
      },
      {
        q: "In which languages can I be served?",
        a: "Hebrew and English.",
      },
      {
        q: "What happens at the first meeting?",
        a: "At the first meeting we listen to the details, explain what the law says about your situation, and set out the options open to you along with the risks of each. By the end of the meeting you will know the practical next steps and whether legal proceedings are warranted.",
      },
      {
        q: "How do I get in touch?",
        a: "By phone at +972-3-7555222, on WhatsApp, by email at office@zahavilaw.com, or through the contact form on this site. We respond to every inquiry promptly.",
      },
    ],
  },
  team: {
    eyebrow: "The Team",
    title: "The people behind the firm",
    subtitle: "An experienced team of attorneys who guide you personally every step of the way.",
    viewProfile: "View full profile",
    backToTeam: "Back to the team",
    areasOfPractice: "Areas of Practice",
    members: [
      {
        slug: "ron-zahavi",
        name: "Ron Zahavi, Adv.",
        role: "Founding Partner",
        bio: "A member of the Israel Bar Association since 1996 and a leading commercial litigator in his field, representing companies and stakeholders in complex civil and commercial proceedings before every court and tribunal. He guides commercial companies and corporations from formation through to managing crises among shareholders, and holds broad expertise in real estate law, including dealings with the Israel Land Authority and TAMA 38 projects.",
        about: [
          "Ron Zahavi, Adv. is a founding partner of the firm and has been a member of the Israel Bar Association since 1996, and is regarded as a leading commercial litigator in his field. He represents companies, controlling shareholders and other stakeholders in complex civil and commercial proceedings before every court and tribunal - including class actions, shareholder disputes, and large-scale contractual and economic disputes - leading each matter from filing through to resolution.",
          "Alongside his litigation practice, he guides commercial companies and corporations throughout their lifecycle - from formation and founders' agreements, through ongoing commercial transactions and arrangements, to managing crises among shareholders and with suppliers, customers and creditors.",
          "He has also built broad expertise in real estate law in all its aspects - from sale and purchase transactions, through dealings with the Israel Land Authority, agricultural land and smallholdings, to TAMA 38 urban-renewal projects, co-ownership agreements and the dissolution of shared ownership - as well as representing clients in inheritance and estate disputes.",
          "His work is grounded in close, hands-on involvement in every case, alongside a commitment to availability and professional service.",
        ],
        practiceAreaSlugs: ["litigation", "commercial", "real-estate", "wills-estates"],
        barAdmission: "1996",
        education: [
          {
            institution: "The College of Management Academic Studies",
            degree: "LL.B",
            year: "1994",
          },
        ],
        credentials: [
          "Civil and commercial litigation before all courts",
          "Corporate counsel and commercial transactions",
          "Real estate, including the Israel Land Authority and TAMA 38",
        ],
        languages: ["Hebrew", "English"],
      },
      {
        slug: "anat-zahavi",
        name: "Anat Zahavi, Adv.",
        role: "Founding Partner",
        bio: "A member of the Israel Bar Association since 1996 and a certified labor-law mediator, with over two decades of experience representing employers. She leads the firm's preventive labor law practice, guiding leading Israeli companies in their day-to-day dealings with employees and regulators, and represents clients before labor courts nationwide.",
        about: [
          "Anat Zahavi, Adv. is a founding partner of the firm, a member of the Israel Bar Association since 1996, and a certified mediator in labor disputes, with over two decades of experience in the field. She specializes in representing employers - including some of Israel's largest companies, food and fast-food chains, telecom and hi-tech companies, import and export businesses, construction companies and private employers - in proceedings before the Regional and National Labor Courts throughout the country.",
          "Her practice is built on a preventive labor law approach, under which she advises clients on an ongoing basis on the applicability of collective agreements and extension orders, the employment and dismissal of pregnant employees, workplace sexual harassment, and disciplinary and criminal matters in the workplace, including proceedings before the Ministry of Economy under the Increased Enforcement of Labor Laws Law.",
          "Alongside her legal practice, she conducts workshops and training sessions for senior and mid-level management on labor relations and the managerial prerogative, equipping employers with the tools to manage their workforce properly while exercising their lawful management rights.",
        ],
        practiceAreaSlugs: ["labor-law"],
        barAdmission: "1996",
        education: [
          {
            institution: "The College of Management Academic Studies",
            degree: "LL.B",
            year: "1994",
          },
        ],
        credentials: [
          "Certified mediator in labor law",
          "Representation of employers before the regional and national labor courts",
          "Labor relations training and workshops for management",
        ],
        languages: ["Hebrew", "English"],
      },
    ],
  },
  publications: {
    eyebrow: "Publications & Media",
    title: "The Firm in the Media",
    subtitle:
      "Selected articles, publications and court decisions reflecting the firm's work and professional experience.",
    empty: "Content is being prepared and will be updated soon.",
    readMore: "Read full article",
    readRuling: "Read the ruling",
    playVideo: "Play video: {title}",
    videoCredit: "Source: {source}",
    rulingPage: {
      aboutTitle: "About this ruling",
      about:
        "This ruling was handed down in proceedings in which the firm represented one of the parties, and is reproduced here in full as published. The complete document is available to read and download below.",
      disclaimer:
        "Every case is decided on its own facts, evidence and applicable law. No conclusion about the possible outcome of another matter can be drawn from the result in this one, and nothing here constitutes legal advice.",
      documentTitle: "The full document",
      openInNewTab: "Open the file in a new tab",
      download: "Download the file",
      metaPrefix: "Court ruling: ",
      metaSuffix: ". Read the full ruling on the firm's website.",
    },
    groups: [
      {
        heading: "The Firm in the Media",
        videos: [
          {
            id: "i7Da1ToH4Kg",
            title:
              "Dismissed while her husband was on reserve duty - the labour court reversed it",
            credit: "Psakdin",
          },
        ],
        items: [],
      },
      {
        heading: "Videos",
        videos: [
          {
            id: "H5QCZkxlM4Q",
            title: "Labor Law - Lawful Employee Termination",
            date: "June 2026",
          },
          {
            id: "kyQIXcARZUs",
            title: "Labor Law - Freelancer Rights",
            date: "June 2026",
          },
          {
            id: "ug6ziO-AJrI",
            title: 'Labor Law - "Invisible" Overtime',
            date: "June 2026",
          },
        ],
        items: [],
      },
      {
        heading: "Court Rulings",
        rulings: [
          { slug: "dismissal-in-limine", title: "Dismissal of the claim in limine - Ron Zahavi, Adv." },
          { slug: "security-deposit", title: "Order to post security for costs - Ron Zahavi, Adv." },
          { slug: "property-eviction", title: "Claim for eviction of a property - Ron Zahavi, Adv." },
          { slug: "trademark-cancellation", title: "Claim for cancellation and revocation of a trademark - Ron Zahavi, Adv." },
          { slug: "defamation", title: "Defamation claim - Ron Zahavi, Adv." },
          { slug: "monetary-claim-dismissed", title: "Monetary claim dismissed - Ron Zahavi, Adv." },
          { slug: "brokerage-fee-dismissed", title: "Brokerage-fee claim dismissed - Ron Zahavi, Adv." },
          { slug: "construction-defects-dismissed", title: "Tenants' claim against the contractor for construction defects and late delivery dismissed - Ron Zahavi, Adv." },
          { slug: "wrongful-dismissal-compensation", title: "Claim for benefits and compensation for wrongful dismissal - Anat Zahavi, Adv." },
        ],
        items: [],
      },
      {
        heading: "Articles",
        items: [
          {
            title: "Shaming of an ultra-Orthodox student: her classmates ordered to pay NIS 144,000",
            source: "mako",
            field: "Defamation",
            date: "June 2026",
            excerpt:
              "The court awarded NIS 144,000 in damages in a shaming case brought against classmates who targeted an ultra-Orthodox student.",
            href: "https://www.mako.co.il/finances-law/law-general/Article-ec1aeec6ff4de91026.htm",
          },
          {
            title: "Employee accrued 134 vacation days against his contract - awarded nearly NIS 250,000",
            source: "ynet",
            field: "Labor Law",
            date: "November 2025",
            excerpt:
              "The labor court awarded an employee nearly a quarter of a million shekels for vacation days accrued contrary to the terms of his employment contract.",
            href: "https://www.mako.co.il/finances-law/work/Article-467b7835cc5ba91027.htm",
          },
          {
            title: "Owner of the prestigious \"Chateau Golan\" winery loses her full claim and is charged costs",
            source: "PsakDin",
            field: "Labor Law",
            date: "January 2018",
            excerpt:
              "A claim of some NIS 660,000, including reimbursement of severance pay, was dismissed in full, and the court ordered the claimant to pay substantial costs.",
            href: "https://www.mako.co.il/finances-law/work/Article-6fa34e38739d161006.htm",
          },
          {
            title: "Dismissed after refusing dangerous work - \"Minofei Avi\" to compensate",
            source: "mako",
            field: "Labor Law",
            date: "September 2018",
            excerpt:
              "An employee dismissed after refusing to perform work that endangered his safety was awarded compensation from the employer.",
            href: "https://www.ynet.co.il/articles/0,7340,L-5341000,00.html",
          },
          {
            title: "City of Bat Yam unlawfully deducted sick days from a teacher",
            source: "PsakDin",
            field: "Labor Law",
            date: "December 2017",
            excerpt:
              "The labor court ruled that the deduction of sick days was unlawful and ordered the municipality to refund the amounts.",
            href: "https://www.psakdin.co.il/Document/עיריית-בת-ים-ניכתה-מעובדת-שכר-שלא-כדין,-ביה-ד-פגיעה-חמורה",
          },
          {
            title: "Over a small letter: awarded severance pay even though they kept working",
            source: "mako",
            field: "Labor Law",
            date: "December 2017",
            excerpt:
              "Precise wording of a letter entitled the employees to severance pay, even though they continued in their roles.",
            href: "https://www.mako.co.il/finances-law/work/Article-6f353c59be48061006.htm?sCh=3d385dd2dd5d4110&pId=563116731",
          },
          {
            title: "Loan or investment? A family dispute over a farmstead will cost a couple NIS 1.4 million",
            source: "mako",
            field: "Real Estate",
            date: "August 2024",
            excerpt:
              "The dispute over the status of funds transferred to purchase the farmstead was decided, and the couple was ordered to pay some NIS 1.4 million.",
            href: "https://www.mako.co.il/finances-law/property-law/Article-e4121216f572191026.htm",
          },
          {
            title: "Allocation of a plot in a moshav fell through - and the buyer will be compensated",
            source: "Calcalist",
            field: "Real Estate & Cooperatives",
            date: "June 2024",
            excerpt:
              "The plot allocation in the moshav was never completed, and the court awarded the buyer compensation - an issue in the realm of cooperatives and urban renewal.",
            href: "https://www.ynet.co.il/economy/article/r1ctbmxs0",
          },
          {
            title: "A \"continuing son\" sued to share the farm with his brother - how did the court rule?",
            source: "Calcalist",
            field: "Real Estate",
            date: "November 2017",
            excerpt:
              "A real estate and inheritance dispute over the status of a \"continuing son\" required to share the agricultural farm with his brother.",
            href: "https://www.calcalist.co.il/local/articles/0,7340,L-3724291,00.html",
          },
          {
            title: "A diamond venture turned out to be a scam - the investor will get her money back",
            source: "ynet",
            field: "Family Law & Contracts",
            date: "August 2017",
            excerpt:
              "A diamond investment venture that proved to be a scam; the court ordered the investor's funds to be returned.",
            href: "https://www.calcalist.co.il/local/articles/0,7340,L-3719551,00.html",
          },
          {
            title: "Court approved: the electric company will run a free hotline and pay NIS 1.4 million to Holocaust survivors",
            source: "Calcalist",
            field: "Class Actions",
            date: "April 2017",
            excerpt:
              "As part of a class action settlement, the electric company will operate a free service hotline and set aside NIS 1.4 million for Holocaust survivors.",
            href: "https://www.calcalist.co.il/local/articles/0,7340,L-3711795,00.html",
          },
          {
            title: "Court approved a class action against Bezeq: allegedly misled customers in advertising",
            source: "ynet",
            field: "Class Actions",
            date: "May 2010",
            excerpt:
              "The court approved the hearing of a class action against Bezeq, alleging that it misled customers through its advertising.",
            href: "https://www.ynet.co.il/articles/0,7340,L-5061164,00.html",
          },
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Get in Touch",
    title: "Let's start with a conversation",
    subtitle:
      "Leave your details and we'll get back to you shortly to schedule a consultation. All inquiries are kept in full confidence.",
    detailsTitle: "Contact details",
    phoneLabel: "Phone",
    phone: "+972-3-7555222",
    whatsappLabel: "WhatsApp",
    whatsappFloatingLabel: "Chat with us on WhatsApp",
    emailLabel: "Email",
    email: "office@zahavilaw.com",
    addressLabel: "Address",
    addressLines: ["Menachem Begin 7, Ramat Gan 5268102,", "Beit Gibor Sport, Floor 23"],
    postalAddress: {
      street: "Menachem Begin 7, Beit Gibor Sport, Floor 23",
      city: "Ramat Gan",
      postalCode: "5268102",
    },
    hoursLabel: "Office hours",
    hours: "Sun-Thu, 09:00-18:00",
    form: {
      title: "Contact & meeting request form",
      name: "Full name",
      namePlaceholder: "John Doe",
      phone: "Phone",
      phonePlaceholder: "+972-50-0000000",
      email: "Email",
      emailPlaceholder: "you@example.com",
      subject: "Subject",
      subjectPlaceholder: "Choose an area",
      message: "Brief description",
      messagePlaceholder: "Tell us briefly how we can help...",
      preferredTime: "Preferred meeting day (optional)",
      preferredTimePlaceholder: "Choose a preferred date",
      preferredTimeNote:
        "* The requested date does not constitute a confirmed appointment. The meeting time will be set and confirmed in coordination with a member of our office.",
      preferredTimeWeekendError:
        "The office operates Sunday-Thursday only. Please choose a date that is not a Friday or Saturday.",
      consentPrefix: "I agree to the ",
      consentPrivacy: "Privacy Policy",
      consentAnd: " and the ",
      consentTerms: "Terms of Use",
      consentSuffix: ".",
      submit: "Send inquiry",
      submitting: "Sending...",
      successTitle: "Your inquiry was sent successfully",
      successBody: "Thank you! We have received your inquiry and will get back to you as soon as possible.",
      errorTitle: "Something went wrong",
      errorBody: "We couldn't send your inquiry. Please try again or contact us by phone.",
      required: "Required field",
      invalidEmail: "Invalid email address",
      consentRequired: "Please confirm consent to continue",
      captchaRequired: "Please verify you're not a robot before sending",
      captchaError: "Security verification failed. Please try again.",
    },
  },
  footer: {
    tagline: "Professional, personal and precise legal representation.",
    quickLinks: "Quick links",
    practiceAreas: "Practice areas",
    contact: "Contact",
    rights: "All rights reserved",
    disclaimer:
      "The content on this site does not constitute legal advice and is no substitute for individual counsel. Do not rely on the site's content without consulting an attorney.",
    privacy: "Privacy Policy",
    accessibility: "Accessibility Statement",
    terms: "Terms of Use",
    careers: "Careers",
    legalLinks: "Legal links",
    secure: "SSL Secured Site",
  },
  faqPage: {
    eyebrow: "Questions & Answers",
    title: "Frequently asked questions",
    subtitle:
      "The questions we are asked most often, grouped by area. If you cannot find an answer here, we are happy to help.",
    generalTitle: "General questions about working with the firm",
    general: [
      {
        q: "When should I contact a lawyer?",
        a: "As early as possible. In most of the areas we handle - labor law, real estate, commercial disputes - coming to us early widens the range of options and sometimes avoids litigation altogether. Once a letter has been sent or a claim filed, the options narrow.",
      },
      {
        q: "How long do legal proceedings take?",
        a: "It depends on the type of proceeding and the court. Labor court cases generally run from several months to two years; civil and commercial claims in the district court can take longer. At the first meeting we will explain the realistic timeframe for your matter.",
      },
      {
        q: "Can a dispute be resolved without going to court?",
        a: "Often, yes. Negotiation, mediation and a well-prepared pre-action approach resolve a significant share of disputes without full proceedings. Anat Zahavi, Adv. is a certified mediator in labor law. We consider this route before turning to the courts whenever it suits the matter.",
      },
      {
        q: "What should I bring to the first meeting?",
        a: "Any document connected to the matter: contracts, correspondence, letters you have received, payslips, land registry extracts - whatever is relevant. Better to bring too much than too little. If you have no documents, you are welcome to come without them.",
      },
      {
        q: "Is my inquiry kept confidential?",
        a: "Yes. Attorney-client privilege applies to everything you tell us, including in an initial inquiry and consultation, even if we ultimately do not represent you.",
      },
    ],
    byAreaTitle: "Questions by practice area",
    stillHaveQuestions: "Still have a question?",
    stillHaveQuestionsBody:
      "Leave your details and we will get back to you, or call the office directly. We are glad to answer any question.",
  },
  careers: {
    eyebrow: "Join Us",
    title: "Careers",
    subtitle:
      "A boutique firm in Ramat Gan, where attorneys take on complex matters alongside the founding partners.",
    cultureTitle: "What it is like to work here",
    culture: [
      "We are a boutique firm, so an attorney here does not receive a fragment of a case but sees it through from beginning to end - drafting pleadings, preparing witnesses, meeting clients and appearing in court.",
      "Both founding partners are involved in the cases day to day, so learning happens through working together rather than at a distance. Anyone who wants to understand how a complex commercial matter looks from the inside, or how a labor court proceeding runs from the employer's side, will get that here from day one.",
      "The firm works across six practice areas, so anyone who has not yet settled on a specialty can be exposed to a broad range before choosing a direction.",
    ],
    offerTitle: "What we offer",
    offer: [
      {
        title: "Working closely with the partners",
        body: "Direct professional guidance from the founding partners, not through a chain of intermediaries.",
      },
      {
        title: "Complex, substantial matters",
        body: "Commercial litigation, labor law from the employer's side, real estate and estates - for some of the largest companies in the Israeli economy alongside private clients.",
      },
      {
        title: "Real responsibility",
        body: "Court appearances and case management, in line with your seniority and experience.",
      },
      {
        title: "Multidisciplinary exposure",
        body: "Six practice areas under one roof, for anyone looking to broaden their legal perspective.",
      },
    ],
    openingsTitle: "Open positions",
    openings: [],
    noOpenings:
      "There are no published openings at the moment. We are always glad to receive CVs from attorneys and interns, and we keep them on file for future opportunities.",
    requirementsLabel: "Requirements",
    applyTitle: "Send us your CV",
    applyBody:
      "Send your CV and academic transcript to the office email, noting the area that interests you. We review every submission and respond to candidates we find suitable.",
    applyCta: "Send your CV by email",
    applyEmail: "office@zahavilaw.com",
  },
  cookies: {
    title: "Cookies on this site",
    body: "We use cookies that are necessary for the site to work. We would also like to use measurement cookies that help us understand how the site is used. Those load only if you accept.",
    accept: "Accept",
    decline: "Necessary only",
    policyLink: "Read the privacy policy",
  },
  notFound: {
    title: "Page not found",
    body: "The link may be incorrect, or the page may have been removed. You can return to the homepage or get in touch with us.",
    cta: "Back to the homepage",
  },
  legal: {
    privacy: {
      title: "Privacy Policy",
      metaDescription:
        "The privacy policy of Zahavi - Pretty & Co. Law Offices - what information we collect on this site, how it is used, and your rights under Israel's Privacy Protection Law.",
      lastUpdated: "Last updated: June 2026",
      intro:
        "Zahavi - Pretty & Co. Law Offices (“the Firm”, “we”) respects your privacy and is committed to protecting the personal information you provide through this website. This policy explains what information we collect, how it is used, with whom it may be shared, and what your rights are.",
      sections: [
        {
          heading: "1. Information We Collect",
          paragraphs: [
            "We collect personal information that you choose to provide through the site's contact form, as well as limited technical information collected automatically for security and proper operation of the site.",
          ],
          items: [
            "Information you submit in the contact form: full name, phone number, email address, subject of inquiry, message content, and preferred contact time.",
            "Technical information collected automatically: IP address, browser type, and basic usage data - used to secure the site, prevent abuse, and operate the request rate-limiting mechanism.",
          ],
        },
        {
          heading: "2. How We Use the Information",
          items: [
            "Responding to inquiries and scheduling consultation meetings.",
            "Providing legal services and handling your matter, should you choose to engage the Firm.",
            "Maintaining the security of the site and preventing misuse of the contact form.",
            "Complying with legal obligations applicable to the Firm.",
          ],
        },
        {
          heading: "3. Basis for Providing Information and Consent",
          paragraphs: [
            "You provide your information voluntarily and are under no legal obligation to do so, but without basic contact details we will be unable to get back to you. By submitting the form and checking the consent box, you confirm the collection and use of your information in accordance with this policy.",
          ],
        },
        {
          heading: "4. Sharing Information with Third Parties",
          paragraphs: [
            "The Firm does not sell or rent your personal information. Your information may be processed and stored by service providers acting on our behalf, including:",
          ],
          items: [
            "The email service provider through which your inquiry is delivered to the firm's inbox.",
            "The site's hosting provider and the technical infrastructure on which it runs.",
            "A human-verification (CAPTCHA) provider that prevents automated form submissions.",
            "Competent authorities or other parties - where required by law, court order, or to protect the Firm's rights.",
          ],
        },
        {
          heading: "5. Transfer of Information Outside Israel",
          paragraphs: [
            "Some of our service providers may store or process information on servers located outside Israel. In such cases we act to ensure the transfer is carried out in accordance with Israel's Privacy Protection Law and its regulations, and subject to appropriate safeguards.",
          ],
        },
        {
          heading: "6. Information Security",
          paragraphs: [
            "We apply reasonable security measures in accordance with the Privacy Protection Regulations (Data Security), 2017, including encryption of traffic between your browser and the site. However, no measure provides absolute protection, and we cannot fully guarantee the security of information transmitted over the internet.",
          ],
        },
        {
          heading: "7. Data Retention",
          paragraphs: [
            "Information is retained for as long as necessary to fulfil the purposes for which it was collected, including handling your inquiry and providing services, and for the period required to meet the legal and professional obligations applicable to the Firm. Thereafter the information is deleted or kept in a non-identifying form.",
          ],
        },
        {
          heading: "8. Your Rights",
          paragraphs: [
            "Under the Protection of Privacy Law, 5741-1981, as amended by Amendment 13 which came into force in August 2025, you have the following rights:",
          ],
          items: [
            "The right to review information about you held in the Firm's databases.",
            "The right to request correction of information that is incorrect, incomplete, unclear or out of date.",
            "The right to request deletion of the information, subject to the law and to the retention obligations that apply to the Firm.",
            "The right to be told the purposes for which the information is used and the parties to whom it is disclosed.",
            "The right to withdraw consent you have given, including consent to measurement cookies, at any time and without giving a reason.",
            "The right to complain to the Privacy Protection Authority if you believe your rights have been infringed.",
          ],
        },
        {
          heading: "9. Cookies and Measurement Tools",
          paragraphs: [
            "This site uses strictly necessary cookies, required for it to operate and stay secure, which do not require consent - for example remembering your language choice and protecting the contact form.",
            "In addition, the site may use Google measurement and advertising tools (Google Analytics and Google Ads), which help us understand how the site is used and measure the effectiveness of our campaigns. These tools use cookies and send data to Google in accordance with its privacy policy.",
            "The measurement and advertising tools load only after you have explicitly accepted them in the cookie banner shown when you arrive. If you choose \"Necessary only\", no measurement or advertising cookie is loaded and no data is sent to Google. You can change your choice at any time by clearing the site's data in your browser, after which the banner appears again.",
            "You can also block cookies generally in your browser settings, though this may affect some features of the site.",
          ],
        },
        {
          heading: "10. Changes to This Policy",
          paragraphs: [
            "The Firm may update this policy from time to time. The updated version will be published on this page and will apply from the date of its publication. We recommend reviewing the policy periodically.",
          ],
        },
        {
          heading: "11. Contact Us About Privacy",
          paragraphs: [
            "For any question or request regarding this policy or your personal information, you may contact us by phone at +972-3-7555222, by email at office@zahavilaw.com, or at Menachem Begin 7, Ramat Gan.",
          ],
        },
      ],
    },
    accessibility: {
      title: "Accessibility Statement",
      metaDescription:
        "The accessibility statement of the Zahavi - Pretty & Co. Law Offices website - our commitment to accessibility, the adjustments made, and how to contact our accessibility coordinator.",
      lastUpdated: "Last updated: August 2026",
      intro:
        "Zahavi - Pretty & Co. Law Offices attaches great importance to providing an accessible and equal service to the entire public, including persons with disabilities, and works to make its website accessible in accordance with the Equal Rights for Persons with Disabilities Law, 5758-1998, and the Equal Rights for Persons with Disabilities Regulations (Service Accessibility Adjustments), 5773-2013.",
      sections: [
        {
          heading: "Level of Accessibility",
          paragraphs: [
            "The site was built with the aim of meeting the requirements of Israeli Standard IS 5568 for web content accessibility, which is based on the WCAG 2.0 guidelines at Level AA. We continuously work to improve the site's level of accessibility.",
          ],
        },
        {
          heading: "Accessibility Adjustments Implemented",
          items: [
            "Full keyboard navigation, including a “skip to content” link at the top of every page.",
            "Semantic page structure with a correct heading hierarchy to support screen readers.",
            "Alternative text for images and informative graphic icons.",
            "Sufficient color contrast between text and background.",
            "Clear focus indication for keyboard users.",
            "Full support for Hebrew (right-to-left) and English (left-to-right) directionality.",
            "Responsive design adapted to a range of screen sizes and devices.",
            "Respecting the user's preference for reduced motion (prefers-reduced-motion).",
          ],
        },
        {
          heading: "The accessibility widget",
          paragraphs: [
            "In addition to the adjustments built into the site itself, an accessibility widget by Enable is installed (licence enable-L56252t5tcus39uj-0826). It can be opened from the accessibility icon on any page and offers, among other things, larger text, contrast and colour changes, link highlighting, a dyslexia-friendly font, animation pausing and an enlarged cursor.",
            "The preferences you choose are stored in your own browser so your choice carries between pages; they are not used for tracking.",
            "Note that the widget is an addition. The site itself is built to be accessible without it - with full keyboard navigation, semantic structure and adequate contrast.",
          ],
        },
        {
          heading: "Known Limitations",
          paragraphs: [
            "Despite our efforts to make all components of the site accessible, some parts or content may not yet be fully accessible, or may include third-party content not under the Firm's control. We continue to work on fixing and improving accessibility on an ongoing basis.",
          ],
        },
        {
          heading: "Accessibility Inquiries and Coordinator",
          paragraphs: [
            "If you encounter any difficulty browsing the site, or have a comment or request regarding accessibility, we would be glad to hear from you and will make every effort to respond promptly.",
            "Accessibility coordinator: you may contact us by phone at +972-3-7555222, by email at office@zahavilaw.com, or at Menachem Begin 7, Ramat Gan.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Use",
      metaDescription:
        "Terms of use for the Zahavi - Pretty & Co. Law Offices website: the nature of the information provided, intellectual property, liability and governing law.",
      lastUpdated: "Last updated: August 2026",
      intro:
        "Use of this website is subject to the terms below. Browsing the site, submitting the contact form or contacting us through the site constitutes acceptance of these terms. If you do not agree to any of them, please do not use the site.",
      sections: [
        {
          heading: "1. Who we are",
          paragraphs: [
            "This site is operated by Zahavi - Pretty & Co. Law Offices, of Menachem Begin 7, Beit Gibor Sport, Floor 23, Ramat Gan, Israel. You can reach us at +972-3-7555222 or office@zahavilaw.com.",
          ],
        },
        {
          heading: "2. The information here is not legal advice",
          paragraphs: [
            "The content on this site, including practice-area descriptions, questions and answers, articles and court rulings, is general information intended to broaden the reader's legal knowledge.",
            "It does not constitute legal advice, a legal opinion or a recommendation to act, and it is no substitute for individual advice that takes account of the specific circumstances of your case. Any reliance on the content of this site is at the user's own risk.",
            "Using this site, contacting us through it or receiving an initial response does not create an attorney-client relationship. Such a relationship is formed only upon signing a written fee agreement.",
          ],
        },
        {
          heading: "3. Court rulings and past results",
          paragraphs: [
            "The rulings and articles presented on this site were previously published and are provided as factual information only. Every case is decided on its own facts, evidence and applicable law, and no conclusion about the possible outcome of one matter can be drawn from the result in another.",
          ],
        },
        {
          heading: "4. Intellectual property",
          paragraphs: [
            "All intellectual property rights in this site - including the text, design, logo, images, trademarks and code - belong to the firm or to the rights holders who licensed their use to the firm.",
            "You may not copy, reproduce, distribute, publish, translate or make commercial use of the site's content, in whole or in part, without the firm's prior written consent. Short quotations are permitted provided the source is credited and linked.",
          ],
        },
        {
          heading: "5. Permitted use",
          paragraphs: ["When using this site you undertake not to:"],
          items: [
            "Provide false details or impersonate another person or entity",
            "Use the site's forms to send spam, advertising or commercial content",
            "Attempt to breach the site's systems, disrupt its operation or circumvent security measures",
            "Automatically harvest information from the site (scraping) without permission",
            "Make any use that infringes third-party rights or breaches the law",
          ],
        },
        {
          heading: "6. Contact form",
          paragraphs: [
            "Submitting details through the contact form is voluntary and constitutes consent to be contacted regarding your inquiry. Details you submit are handled in accordance with the site's privacy policy.",
            "Please avoid submitting sensitive or detailed information about your matter through the form. An initial inquiry is intended to arrange a call or meeting; the details of your case are best discussed in a protected setting.",
          ],
        },
        {
          heading: "7. Links to external sites",
          paragraphs: [
            "This site contains links to third-party sites, including news outlets, case-law databases and video platforms. The firm is not responsible for the content, availability or privacy practices of those sites, and the inclusion of a link is not an endorsement of their content.",
          ],
        },
        {
          heading: "8. Availability and limitation of liability",
          paragraphs: [
            "The site is provided on an As Is basis. The firm makes reasonable efforts to keep the site available and its content accurate, but does not warrant uninterrupted or fault-free operation, nor that all content is current at any given moment in light of changes in legislation and case law.",
            "Subject to applicable law, the firm will not be liable for any direct or indirect damage arising from use of the site or reliance on its content.",
          ],
        },
        {
          heading: "9. Accessibility",
          paragraphs: [
            "This site has been made accessible in accordance with the Equal Rights for Persons with Disabilities Regulations (Accessibility Adjustments to Service) and Israeli Standard IS 5568 at level AA. Full details, including known limitations and the accessibility coordinator's contact information, appear in the accessibility statement.",
          ],
        },
        {
          heading: "10. Changes to these terms",
          paragraphs: [
            "The firm may update these terms from time to time. The binding version is the one published on this site, and the date of the most recent update appears at the top of this page. We recommend reviewing the terms periodically.",
          ],
        },
        {
          heading: "11. Governing law and jurisdiction",
          paragraphs: [
            "These terms and the use of this site are governed exclusively by the laws of the State of Israel. Exclusive jurisdiction over any matter relating to the site or these terms lies with the competent courts of the Tel Aviv District.",
          ],
        },
        {
          heading: "12. Contact",
          paragraphs: [
            "For questions about these terms, contact us at office@zahavilaw.com or +972-3-7555222.",
          ],
        },
      ],
    },
  },
};

export default en;
