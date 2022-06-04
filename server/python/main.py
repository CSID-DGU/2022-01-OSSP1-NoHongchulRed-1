import sys
import json
import numpy as np
from sklearn.decomposition import TruncatedSVD

# 숫자 표현 형식 지정
np.set_printoptions(precision=3, suppress=True)

# 인자로 데이터 받아옴
R = json.loads(sys.argv[1])

# 원본 행렬 R 생성
R = np.array(R)

nonDatas = []
for i, rate in enumerate(R[len(R)-1]):
    if (rate == 0):
           nonDatas.append(i)

# Simple SVD
u, s, vh = np.linalg.svd(R, full_matrices=False)

# 특이값 개수(잠재요인 차원) K는 2 설정
svd = TruncatedSVD(n_components=2)
svd.fit(R)

u = u[:, :2]
s = svd.singular_values_
vh = vh[:2, :]

# 예측 평점 행렬 계산
us = np.matmul(u, np.diag(s))
result = np.matmul(us, vh)

#print(result)

# 정렬하여 추천 도서 가져오기 위한 과정
# 평점 높은 순으로 인덱스 정렬하여 넘겨줌
recommand = []
count = 0
for i, rate in enumerate(result[len(result)-1]):
    if (count >= len(nonDatas)):
        break
    if (i == nonDatas[count]):
        recommand.append((i, rate))
        count += 1

recommand.sort(key=lambda x:x[1], reverse=True)

ret = []
for element in recommand:
    ret.append(element[0])

print(ret)
