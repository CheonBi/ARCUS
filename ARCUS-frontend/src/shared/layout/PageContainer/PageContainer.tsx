/**
 * 페이지 전제 폭/패딩 설정 컴포넌트
 */
import { pageContainerVariants } from "./pageContainer.styles";
import { type pageContainerProps } from "./pageContainer.types";
import { cn } from "@shared/lib/cn";

export const PageContainer = ({ className, size, children, ...props }: pageContainerProps) => {
  return (
    <div className={cn(pageContainerVariants({ size }), className)} {...props}>
      {children}
    </div>
  );
};

PageContainer.displayName = "PageContainer";
