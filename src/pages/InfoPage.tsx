const InfoPage = () => {
  return (
    <section className="flex flex-col gap-10 m-32 mb-0 items-center">
      <h1 className="font-extrabold text-3xl">무엇을 할 수 있나요?</h1>
      <ul className="flex flex-col gap-2 items-start">
        <li>1. 책 제목을 검색하여 책을 찾을 수 있습니다.</li>
        <li>2. 책장에 책을 추가하거나 삭제할 수 있습니다.</li>
        <li>3. 책장에서 책별로 태그를 최대 5개까지 추가할 수 있습니다.</li>
        <li>4. 태그 별로 책을 모아 볼 수 있습니다.</li>
        <li className="text-primary">
          5. 별점을 기록할 수 있습니다. (기다려주세요!)
        </li>
        <li className="text-primary">
          6. 독서 진행 상황을 기록할 수 있습니다. (기다려주세요!)
        </li>
      </ul>
    </section>
  );
};

export default InfoPage;
