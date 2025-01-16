import Navigation from '../ui/navigation';

export default async function DetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <aside>
        <div>개인정보</div>
        <div>임신정보</div>
        <div>생활습관</div>
        <div>가족력</div>
      </aside>
      <main>
        <div>
          <div>동반질환</div>
          <div>문제</div>
        </div>
        <div>
          <Navigation />
          <section>{children}</section>
        </div>
      </main>
    </div>
  );
}
