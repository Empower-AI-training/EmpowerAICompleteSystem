import './globals.css'

export const metadata = {
  title: 'EmpowerAI Complete System - 51 AI Templates',
  description: 'ADHD-friendly AI business toolkit with success tracking for entrepreneurs',
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