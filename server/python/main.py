import numpy as np
from sklearn.decomposition import TruncatedSVD

# 원본 행렬 R 생성, 분해 행렬 P와 Q 초기화, 잠재요인 차원 K는 3 설정.
R = np.array([[4,4,6,5,3,4,8,9,3,2],
              [5,10,7,6,7,6,4,1,4,5],
              [2,3,4,4,5,4,7,7,2,2],
              [7,8,5,5,6,6,2,1,8,7],
              [4,6,7,5,3,3,1,1,5,5],
              #[5,7,0,0,3,0,0,0,6,6],
              #[6,4,4,3,4,4,2,0,5,0],
              [0,5,4,0,3,2,0,7,4,4]])

# 테스트 후보
# [0,5,4,0,3,2,0,7,4,4]
# [5,7,0,0,3,0,0,0,6,6]
# [6,4,4,3,4,4,2,0,5,0]

# Simple SVD

u, s, vh = np.linalg.svd(R, full_matrices=False)

us = np.matmul(u, np.diag(s))
a = np.matmul(us, vh)

svd = TruncatedSVD(n_components=3)
svd.fit(R)

u = u[:, :3]
s = svd.singular_values_
vh = vh[:3, :]

us = np.matmul(u, np.diag(s))
a = np.matmul(us, vh)
a = np.round(a, 3)

print("prediction matrix :\n", a)