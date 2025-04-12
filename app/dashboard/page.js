// app/dashboard/page.js
import DashboardComponent from '@/components/DashboardComponent'

export default function DashboardPage({ articles, user, article_sum }) {
  // Daten könnten per getServerSideProps geladen werden
  return <DashboardComponent articles={articles} user={user} article_sum={article_sum} />
}
