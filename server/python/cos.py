import sys
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# 숫자 표현 형식 지정
np.set_printoptions(precision=3, suppress=True)

# 인자로 데이터 받아옴
R = json.loads(sys.argv[1])
R2 = json.loads(sys.argv[2])

# 원본 행렬 R 생성
R = np.array(R)
R2 = np.array(R2)

#테스트데이터
'''
preferMat = [[0,0,0,1,1,1,0,1,0,0],
            [0,1,0,1,0,0,0,1,1,1], 
            [0,0,0,1,1,1,1,0,1,0], 
            [0,0,1,1,1,0,1,1,1,1], 
            [1,1,1,1,0,0,1,1,1,0],
            [0,0,0,1,1,1,0,0,0,1],
            [0,0,1,1,0,0,1,1,1,0]]
'''

#각 유저와 자신의 코사인 유사도 계산
similarity = []
for i in range(len(R)):
    tmp = cosine_similarity(R[i].reshape(1,-1), R2.reshape(1,-1))
    similarity.append((i,tmp))
#    print(similarity[i])

#유사도 높은 순서로 유저 정렬
similarity.sort(key=lambda x:x[1], reverse=True)

# 인덱스만 추출
ret = []
for element in similarity:
    ret.append(element[0])

#자신과 유사도 비슷한 상위 3명 유저 인덱스 출력
print(ret[0:3])
