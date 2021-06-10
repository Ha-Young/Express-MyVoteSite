![main](.\readME_asset\main.png)

## 배포링크

[여기](https://vaco-voting.herokuapp.com/)

#### 테스트 아이디
- 아이디 : admin@admin.com
- 비밀번호 : admin


## 기능

- 로그인, 회원가입
- 투표, 투표생성, 투표삭제
- 내 투표 보기
- **메인 페이지에서 무한스크롤 구현**
  - `mongoose-paginate-v2` 모듈을 이용한 API 제작 (PaginatedGetVote EndPoint)
    - Ex) `/api/votes?condition=all&page=1&limit=30&sort_field=expire_datetime&sort_order=-1`
  - 프론트 Javascript 소스에서 scroll Event에 API fetch
    - scroll event 모듈화
    - scroll event에 throttle 적용 (예전 과제때 사용했던 `requestAnimationFrame`을 이용한 throttle)
- **메인 페이지 filtering**
  - all / in progress / expired 로 필터링 가능
  - 위 Pagenated API 적용
- **생성날짜, 만료날짜, 현재날짜를 계산하여 만료 percent 뷰잉**
- **chart js를 사용한 투표 결과 뷰잉**



## 어려웠던 점

### 로그인 문제

처음에 로그인을 Server Side Rendering으로 구현하려고 하다 보니 

오류 발생시 다시 랜더링을 해주고 하는 방식 때문에 히스토리에 쌓이는게 싫었습니다..

이후 API로 구현을 했으면 어땠을까 생각하고 있습니다.

> 지금 auth에 대한 api를 만들어 두었지만 javascript단에서 적용시키기에는 시간부족으로 하지 못했습니다. 아쉽습니다..

#### JWT Token

맨 처음 JWT Token을 로그인시에 발급해주고 로그아웃했을 때 다시 서버에서 endpoint로 받아 쿠키에 있는 jwt token 삭제하는 방식과 서버에서 auth체크를 한 후 로그인이 안되어있으면 로그인페이지로 랜더링하는 방식으로 진행했는데, 이와같은 방법이 잘못되었다고 추후 깨닫게 되었습니다.

서버는 JWT Token만 발급해주고 이 JWT Token을 헤더를 통해서 받아서 검증만 해주면 되는건데,
처음에 구현했을 때 서버에서 이래저래 다 확인도 하고 삭제도 하고 검증 후 안되어있으면 로그인페이지로 랜더링하고 등등을 하려고 했습니다 ㅠ

이후 잘못되었다는걸 깨닫고 클라이언트에서 jwtToken유무를 통해 로그인 확인을 하고 자체적으로 login페이지로 이동하고 logout(Token삭제)을 진행하는 방식으로 바꿨습니다.

#### 이전 페이지로 회귀

이 부분은 투표를 진행했을 때 로그인이 안되어있다면 로그인 페이지로 보내고, 로그인을 한 후에 다시 투표페이지로 돌아와야 하는 기능이었습니다.

이 부분도 맨 처음 서버에서 모든 역할을 하려다보니 구현이 매우 힘들었고 이후 클라이언트 측에서 cookie에서 jwtToken유무를 확인하고 없으면 미로그인상태로 판단, 로그인 페이지로 이동시키도록 하였습니다.

>  `window.location.href` 이용

로그인 성공 후에 다시 원래 페이지로 돌아가는 부분에서는 로그인 페이지로 보낼 때 query로 

> login?prevPage=이전페이지

와 같이 전송을 해주고, 로그인 포스트 전송시 서버에서 이 prevPage도 같이 받아서 로그인 성공 후 prevPage가 있으면 prevPage로 Redirect 시키도록 하였습니다.

#### 깃헙 로그인 이전페이지로 회귀

로컬 로그인 같은 경우는 위와 같은 방법을 이용하였으나 깃헙로그인은 버튼 클릭시 GET요청으로 /github-login endpoint로 보내서 위와 같은 방법의 prevPage를 body에 같이 담아서 보낼 수는 없었습니다.

그래서 github로그인을 위해 prevPage를 서버측에 전송하는 방법으로

`/github-login?prevPage=....` 처럼 query string을 이용하였습니다.

하지만 또 다른 문제로 로그인 진행과정에서 깃헙 페이지 url로 바뀌었다가 돌아오기 때문에 기억하고 있던 prevPage가 없어지는 현상이 발생했습니다.

이 부분은 session을 이용할 수 밖에 없겠다고 판단하였고,

`express-session` 을 사용해서 github url로 바뀌기 전에 `req.session.prevPage = ...` 과 같이 세션에 저장을 해 두고

로그인 이후 redirect 받은 페이지에서 이 session안에 담긴 prevPage를 꺼내서 redirect를 시키는 방식으로 하였습니다.

이 방법이 맞는지 의문이 들긴하나, 구현을 했다는 점에서 기분이 좋았습니다.



### 무한 스크롤

개발 도중에 vote가 많으면 DB에 있는 모든 vote를 가져오는 것도 문제지만, 모두 가져온 vote들을 한꺼번에 render시키는 것이 큰 문제가 되겠다고 판단하였습니다.

따라서 페이지네이션 혹은 무한스크롤을 구현을 하려고 하였습니다.

페이지네이션은 SSR로도 충분히 구현가능했지만, 저는 왠지 무한스크롤을 구현하고 싶었는데 이는 돌이킬 수 없는 늪이었고 개발중에 후회를 하게되었습니다..ㅠ

어쨌든 무한스크롤을 구현하기위해 mongoose-paginate-v2라는 모듈도 찾아서 페이지네이션기능이 있는 get votes API를 만들었습니다.

API를 만드는 것도 일이었는데 이를 프론트 javascript단에서 적용시켜야 되었습니다....

어찌저찌 적용까지 다 하고 잘 되는걸 보니 만족스러우나 API만드느랴, 프론트에 적용하느랴 매우 번거로운 작업이었습니다.

하지만 RESTful API를 만들어봤다는 경험과 vanilla javascript를 사용하기도 하고 벡앤드 시간에 프론트를 하게되어서 매우 행복한 시간이었습니다.

> 저는 vanilla javascript와 front가 훠얼씬 더 즐겁습니다.



### API와 SSR Router 구분

위와 같은 맥락이긴 한데 API와 SSR에 대한 Routing작업을 하려니 매우 번거롭고 힘들었던 것 같습니다.

또 작업 중에 API와 SSR 라우터에 대한 중복로직이 발생할 것 같았고, 실제로 발생하게 되었는데,

이를 위해 각각 end point에 대한 controller를 없애고 service를 만들어서

API와 SSR 라우터에 대한 중복로직을 service를 통해 해결하였습니다.



### Model 설계 및 MongoDB 활용

모델 설계또한 힘들었습니다. 

User와 Vote 모델 단 두개인데 처음 설계했던 것에서 몇번을 수정했는지 모르겠습니다.

그리고 MongoDB에 대한 메소드나 활용 지식등이 부족해서 내가 원하는 것이 되는건지, 된다면 원하는 어떤것을 사용해야되는지 알아보는 것이 힘들었습니다.



### Error 핸들링

애러 핸들링은 이번과제에 매우 미흡하게 적용된 것 같습니다.

GET 요청의 Query, 다른 요청들에 대한 Body에 대한 validation을 celebrate라는 모듈을 통해 진행한 후 문제가 있으면 400 Bad Request를 날리는 것과

auth관련 권한문제 없을시에 401 Unauthorized 애러 외에 다른 애러처리는 적용하지 못했습니다..ㅠ

> 지금 400과 401에 대한 처리를 제외하고 모두 500애러 발생

각 라우터 앤드포인트와 service에 대해서 try, catch와 애러가 발생할 경우에대한 분기처리는 저번과제보다 디테일하게 진행하였으나 어떠한 상황일 때 어떠한 애러를 발생시켜야하는지는 아직 잘 모르겠습니다.
