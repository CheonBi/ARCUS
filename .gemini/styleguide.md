1. 공통 원칙 (Common Principles)
   - 코드와 변수명은 English를 사용하되, 주석(Comments)과 커밋 메시지, PR 설명, 코드리뷰는 한국어 사용을 원칙으로 합니다.

2. 네이밍 규칙:
   - 클래스/인터페이스: PascalCase
   - 변수/함수/메소드: camelCase
   - 상수(Constants): UPPER_SNAKE_CASE
   - 코드 품질: 중복 코드를 지양하고(DRY), 하나의 함수는 하나의 기능만 수행(SRP)하도록 제안합니다.

3. Java & Spring Boot 스타일
   - Lombok 활용: 반복되는 Getter/Setter 대신 Lombok 어노테이션(@Getter, @Setter, @RequiredArgsConstructor) 사용을 권장합니다.
   - 의존성 주입: @Autowired 필드 주입보다는 생성자 주입(Constructor Injection) 방식을 우선합니다.
   - Optional 사용: Null 가능성이 있는 반환값은 Optional<T>을 사용하고, .get() 직접 호출보다는 .orElseThrow() 처리를 제안합니다.
   - Entity vs DTO: 데이터베이스 엔티티를 API 응답으로 직접 반환하지 않고, 반드시 DTO로 변환하여 전달하는지 확인합니다.

4. JavaScript / TypeScript & React 스타일
   - 함수형 컴포넌트: 모든 React 컴포넌트는 Functional Component와 Hooks(useState, useEffect)를 사용합니다.
   - Props 구조 분해 할당: 컴포넌트 인자에서 바로 구조 분해(Destructuring)하는 형식을 선호합니다.
   - 예: const MyComponent = ({ title, items }) => { ... }
   - TypeScript 타입 정의: any 사용을 엄격히 금지하며, 인터페이스(interface) 또는 타입(type)을 명확히 정의합니다.
   - 상태 관리: 불필요한 useEffect 사용을 지양하고, 파생된 상태(Derived State)는 변수로 처리합니다.

5. 인프라 및 설정 (Docker, Nginx)
   - Docker: 이미지 최적화를 위해 Multi-stage build 사용 여부를 검토합니다.
   - Environment Variables: 보안을 위해 하드코딩된 API Key나 패스워드가 소스코드에 포함되지 않았는지 감시합니다. (.env 활용)
   - Nginx: 설정 파일에서 불필요한 노출을 방지하기 위해 server_tokens off; 등 보안 설정을 권장합니다.

6. 리뷰 시 중점 사항 (Review Focus)
   - 동시성 이슈: Spring Boot 환경에서 공유 자원에 대한 접근이 안전한지 확인합니다.
   - 에러 핸들링: try-catch에서 예외를 단순히 무시(e.printStackTrace())하지 않고 적절히 로깅하거나 예외를 전파하는지 확인합니다.
   - 성능: React에서 불필요한 리렌더링이 발생하는 패턴(인라인 함수 정의 등)을 찾아냅니다.
