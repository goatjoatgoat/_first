import styles from './Banner.module.css'

export default function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.badge}>🚀 지금 가장 인기 있는 강의</p>
        <h1 className={styles.title}>
          C언어, 제대로 배우면<br />
          모든 프로그래밍의 기반이 됩니다
        </h1>
        <p className={styles.desc}>
          포인터, 메모리, 자료구조까지 — 실무에서 통하는 C언어를 배워보세요.
        </p>
        <button className={styles.ctaBtn}>무료 강의 시작하기</button>
      </div>
      <div className={styles.codeBlock}>
        <pre>{`#include <stdio.h>

int main() {
    printf("Hello, C Learn!\\n");

    int arr[5] = {1,2,3,4,5};
    int *ptr = arr;

    for(int i=0; i<5; i++) {
        printf("%d ", *(ptr + i));
    }
    return 0;
}`}</pre>
      </div>
    </section>
  )
}
