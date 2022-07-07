import sys
import json
import numpy as np
from sklearn.decomposition import TruncatedSVD

# 숫자 표현 형식 지정
np.set_printoptions(precision=3, suppress=True)

# 인자로 데이터 받아옴
r = json.loads(sys.argv[1])

# 원본 행렬 r 생성
r = np.array(r)

# 예측해야 할 도서 인덱스 저장(점수가 0인 것)
nonDatas = []
for i, rate in enumerate(r[len(r)-1]):
    if (rate == 0):
           nonDatas.append(i)

# Simple SVD
u, s, vh = np.linalg.svd(r, full_matrices=False)

# 특이값 개수(잠재요인 차원) K는 4 설정
# 테스트 결과 경험적으로 4가 가장 적절하다고 판단
K = 4
svd = TruncatedSVD(n_components=K)
svd.fit(r)

u = u[:, :K]
s = svd.singular_values_
vh = vh[:K, :]

# 예측 평점 행렬 계산
us = np.matmul(u, np.diag(s))
result = np.matmul(us, vh)

# 정렬하여 추천 도서 가져오기 위한 과정
# 평점 높은 순으로 인덱스 정렬하여 넘겨줌

# 튜플 만드는 과정
recommand = []
count = 0
for i, rate in enumerate(result[len(result)-1]):
    if (count >= len(nonDatas)):
        break
    if (i == nonDatas[count]):
        recommand.append((i, rate))
        count += 1

# 평점 순 정렬
recommand.sort(key=lambda x:x[1], reverse=True)

# 인덱스만 추출, 책 3권까지만(NUMOFBOOK)
NUMOFBOOK = 3
ret = []
for i, element in enumerate(recommand):
    if (i < NUMOFBOOK):
        ret.append(element[0])
    else:
        break

print(ret)
