type Article = {
  title: string;
  description: string;
  cover?: string;
}

interface ArticleCardProps {
  item?: Article
}

function ArticleCard({ item }: ArticleCardProps) {

  const realItem = item
  return (
    <div className="p-3 border grid gap-3 rounded-s">
      {realItem && <img src={realItem?.cover} />}
      <div>
        { realItem && <><h3 className="font-bold">{realItem?.title}</h3><h4 className="text-sm">{realItem?.description}</h4></> }
        { !realItem && 'No data' }
      </div>
    </div>
  );
}

export default ArticleCard;