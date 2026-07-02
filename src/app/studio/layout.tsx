export const metadata = {
  title: 'Nova City FC | Studio',
  description: 'Sanity Studio for Nova City FC',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
