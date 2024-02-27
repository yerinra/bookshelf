import H1 from "../components/atoms/H1";
import { SEOMetaTags } from "../components/molecules/SEOMetaTags";

const InfoPage = () => {
  return (
    <>
      <SEOMetaTags
        title={`Info - BOOK:SHELF`}
        desc={`사이트 전체에 대한 상세 정보 페이지입니다.`}
      />
      <section className="flex flex-col gap-10 mb-0 -mt-40 items-center">
        <H1>🔎 무엇을 할 수 있나요?</H1>
        <ul className="flex flex-col gap-2 items-start">
          <li>1. 책 제목을 검색하여 책을 찾을 수 있습니다.</li>
          <li>2. 책장에 책을 추가하거나 삭제할 수 있습니다.</li>
          <li>3. 책장에서 책별로 태그를 최대 5개까지 추가할 수 있습니다.</li>
          <li>4. 태그 별로 책을 모아 볼 수 있습니다.</li>
          <li>5. 별점을 기록할 수 있습니다.</li>
          <li>
            6. 추가 순, 제목 순, 작가 순, 별점 순으로 책들을 정렬할 수 있습니다.
          </li>
          <li className="text-accent">
            7. 독서 진행 상황을 기록할 수 있습니다. (기다려주세요!)
          </li>
        </ul>
      </section>
    </>
  );
};

export default InfoPage;
