export const metadata = {
  title: 'Next.js Test App',
  description: 'Simple test app for Elastic Beanstalk deployment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}