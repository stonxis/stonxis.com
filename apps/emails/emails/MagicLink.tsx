import { Html, Head, Body, Container, Text, Tailwind, Link, Button, Img, Font } from "@react-email/components";

interface MagicLinkProps {
  url: string;
}

export default function MagicLinkEmail({ url }: MagicLinkProps) {
  return (
    <Html>
      <Head>
        <Font fontFamily="Inter" fallbackFontFamily="Verdana" />
      </Head>
      <Body className="bg-gray-100">
        <Tailwind>
          <Container className="max-w-md mx-auto bg-white rounded-xl shadow-lg text-start py-16 px-12">
            {/* Logo */}
            <div className="">
              <h1>Stonxis</h1>
            </div>

            {/* Título */}
            <h2 className="text-2xl font-semibold text-gray-900 mt-3">Seu link de acesso</h2>

            {/* Texto explicativo */}
            <Text className="text-gray-700 mt-2">
              Clique no botão abaixo para acessar sua conta:
            </Text>

            {/* Botão de acesso */}
            <div className="mt-4">
              <Button
                href={url}
                className="bg-green-500 text-center text-white font-medium py-3 px-6 rounded-full shadow-md hover:bg-green-600"
              >
                Acessar Conta
              </Button>
            </div>

            {/* Alternativa de link */}
            <Text className="text-gray-600 mt-6 text-sm">
              Ou copie e cole este link no seu navegador:
            </Text>
            <Link href={url} className="text-blue-500 break-all text-sm">
              {url}
            </Link>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
}
