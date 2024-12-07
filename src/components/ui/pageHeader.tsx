type PageHeaderProps = {
  title: string
  subtext?: string | undefined
}

export default function PageHeader({ title, subtext }: PageHeaderProps) {
  return (
    <div className="header-box">
      <h1 className="header-box-title">{title}</h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  )
}
