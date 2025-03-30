import { Box, Container, Typography } from '@mui/material';

/**
 * Defines a section structure for Terms of Service.
 */
interface Section {
  number: string;
  title: string;
  content: (string | { point: string; text: string })[];
}

/**
 * Array containing all sections of the Terms of Service.
 */
const sections: Section[] = [
  {
    number: "01",
    title: "Introduction",
    content: [
      "Welcome to React ChatBotify Gallery, a platform designed to facilitate the browsing, rating, sharing, and downloading of themes & plugins created by various authors.",
      "We serve as a platform only and do not own or endorse any themes & plugins uploaded by users.",
      "By using our service, you agree to comply with and be bound by the following Terms of Service. If you do not agree with these terms, please do not use our service."
    ]
  },
  {
    number: "02",
    title: "Ownership of Themes & Plugins",
    content: [
      "All themes & plugins available on React ChatBotify Gallery are the intellectual property of their respective authors.",
      "By uploading content, you represent and warrant that you have the necessary rights to grant us a license to host, distribute, and make available your content to others.",
      "We do not claim ownership of any themes & plugins provided through our platform.",
      "The rights to these themes & plugins, including any copyrights or trademarks, remain with the original authors."
    ]
  },
  {
    number: "03",
    title: "User Responsibilities",
    content: [
      { point: "3.1", text: "Users are responsible for ensuring that the themes & plugins they choose to use are appropriate for their needs and that they understand their functionality and limitations." },
      { point: "3.2", text: "Users must comply with any licensing terms provided by the authors of the themes & plugins." },
      { point: "3.3", text: "Users may not redistribute, sell, or claim ownership of any themes & plugins downloaded from our platform unless explicitly permitted by the author." },
      { point: "3.4", text: "Users agree to respect the intellectual property rights of others and acknowledge that any violations could result in account suspension or termination." }
    ]
  },
  {
    number: "04",
    title: "Disclaimer of Warranties",
    content: [
      { point: "4.1", text: "React ChatBotify Gallery provides themes & plugins on an 'as is' basis without warranties of any kind, either express or implied." },
      { point: "4.2", text: "We do not guarantee that the themes & plugins will meet your requirements, be error-free, or be compatible with your specific environment." },
      { point: "4.3", text: "React ChatBotify Gallery does not vet or endorse any themes & plugins available on the platform, and users download and use them at their own risk." },
      { point: "4.4", text: "We do not make any warranties regarding the security, reliability, or performance of the themes & plugins." }
    ]
  },
  {
    number: "05",
    title: "Limitation of Liability",
    content: [
      { point: "5.1", text: "To the fullest extent permitted by law, React ChatBotify Gallery shall not be held liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the themes & plugins, even if we have been advised of the possibility of such damages." },
      { point: "5.2", text: "This includes but is not limited to damages related to loss of data, profits, or business interruption." }
    ]
  },
  {
    number: "06",
    title: "Indemnification",
    content: [
      "You agree to indemnify and hold harmless React ChatBotify Gallery, its affiliates, and its members from any claims, damages, losses, or legal fees arising from your use of the themes & plugins, your violation of these Terms of Service, or your violation of any rights of another."
    ]
  },
  {
    number: "07",
    title: "Changes to the Terms of Service",
    content: [
      "We reserve the right to modify these Terms of Service at any time.",
      "Any changes will be effective immediately upon posting on our platform.",
      "Continued use of the platform following any changes constitutes your acceptance of the new terms."
    ]
  },
  {
    number: "08",
    title: "Governing Law",
    content: [
      "These Terms of Service are governed by and construed in accordance with the laws of Singapore.",
      "Any disputes arising out of or related to these terms shall be resolved in the courts of Singapore."
    ]
  },
  {
    number: "09",
    title: "Contact Information",
    content: [
      "If you have any questions or concerns about these Terms of Service, please contact the core team on Discord."
    ]
  },
  {
    number: "10",
    title: "User Accounts",
    content: [
      "Users are responsible for maintaining the confidentiality of their account information and are fully responsible for all activities that occur under their account."
    ]
  },
  {
    number: "11",
    title: "Content Removal",
    content: [
      "React ChatBotify Gallery reserves the right to remove any content that violates these terms or is deemed inappropriate at our discretion, without notice."
    ]
  },
  {
    number: "12",
    title: "Third-Party Links and Integrations",
    content: [
      "Our platform may contain links to third-party websites or integrate with third-party services.",
      "We are not responsible for the content, policies, or practices of these third-party sites or services."
    ]
  },
  {
    number: "13",
    title: "Termination",
    content: [
      "We reserve the right to terminate or suspend your account at any time, with or without cause, and with or without notice, especially if you violate these terms."
    ]
  },
  {
    number: "14",
    title: "Age Requirement",
    content: [
      "By using React ChatBotify Gallery, you affirm that you are at least 13 years of age or older, or have parental consent if younger, in compliance with applicable laws."
    ]
  }
];

/**
 * Terms of Service component that displays platform policies and guidelines.
 */
const TermsOfService: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant="h3" color="text.primary" fontWeight="bold" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          While open-source libraries encourage collaboration and accessibility, it's essential to ensure that users and contributors understand their rights and responsibilities. Our Terms of Service provide clear guidelines on usage, modification, and distribution.
        </Typography>
      </Box>

      {sections.map(({ number, title, content }) => (
  <Box key={number} sx={{ mt: 5 }}>
    <Typography variant="h5" color="text.primary" fontWeight="bold">
      <Box component="span" fontWeight="light" sx={{ mr: 1 }}>
        {number}
      </Box>
      {title}
    </Typography>

    {/* Handle content rendering */}
    <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
      {content
        .filter((item) => typeof item === "string") // Only get simple paragraphs
        .join(" ")} {/* Join them into a single paragraph */}
    </Typography>

    {content
      .filter((item) => typeof item !== "string") // Handle points separately
      .map((item, index) => (
        <Typography key={index} variant="body1" color="text.primary" sx={{ mt: 1 }}>
          <strong>{(item as { point: string; text: string }).point}</strong>{" "}
          {(item as { point: string; text: string }).text}
        </Typography>
      ))}
  </Box>
))}


      <Box sx={{ mt: 5, opacity: 0.5 }}>
        <Typography variant="body2" color="text.primary">
          Effective date for this policy: 2nd of March 2025
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfService;
