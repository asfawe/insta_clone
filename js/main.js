const heart = document.querySelector(".heart_btn");
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');
const delegation = document.querySelector('.contents_box');



function delegationFunc(e) {
    let elem = e.target;

    
    /* 만약 너가 클릭한 elem가 data-name이 없다면?? 계속 실행 */
    while(!elem.getAttribute('data-name')){
        elem = elem.parentNode;
        /* elem.parentNode란 요소의 부모를 나타냅니다. 

        예시를 들어보져~
        <div>
            <ul>
                <li>
                <a href="#" data-name="example">Example</a>
                </li>
            </ul>
        </div>
        
        여기서 elem이 a 요소를 나타내는 경우, 
        elem.parentNode는 li 요소를 나타냅니다. 
        li 요소의 부모 요소는 ul 요소이며, 
        ul 요소의 부모 요소는 div 요소입니다. 
        따라서 elem.parentNode.parentNode는 div 요소를 나타냅니다.
        */

        /* 만약 elem의 nodeName이 최상위 elem인 BODY를 만나게 된다면 return!! */
        if(elem.nodeName === 'BODY') {
            elem = null;
            return;
        }
    }

    /* 니가 클릭한 elem의 대상의 data-name속성이 
    heartbeat라는 이름으로 속성을 가지고 있으면 
    이 안에 있는 문구를 실행해!! 라는 뜻입니다.*/
    if(elem.matches('[data-name="heartbeat"]')) {

        console.log('하트!');
        let pk = elem.getAttribute('name'); // 37
        $.ajax({
            type: 'POST', /* 어떤 방식으로 통신을 할 거냐? */
            url:'data/like.json', /* 통신할 url을 받아와주는 겁니다. 저희는 data/like.json과 통신을 하겠다는 말입니다. */
            data:pk,
            // data:{pk}, /* data는 Ajax 통신에서 서버로 전송할 데이터를 설정하는 옵션입니다 */
            /* (tmi) pk: backend로 가면 pk를 받아올겁니다. 
            pk를 이용해서 numbering을 찍어내고요. 
            거기에 각유저들이 가지고 있는 pk값있어서 그걸 갱신을 통해서 
            고유한 번호를 찍어내거나 작성을 합니다.  */
        
            dataType:'json', /* 내가 보낸 애가 어떤 데이터 타입으로 들어올건지. */
            success: function(response){ /* 통신이 완료 되었을 때 기본적으로 response 객체를 받아온다.
            response객체는 우리가 통신을 성공한 데이터들이 들어옵니다. */
                let likeCount = document.querySelector('#like-count-37');
                likeCount.innerHTML = '좋아요' + response.like_count + '개';
                                             /* response.like_count 같은 경우는 data.like.json안에 있는 like_count입니다.
                                             왜냐하면.. response는 통신이 완료 되었을 때 통신의 성공한 데이터들을 받아오기 때문이죠. */
            },
            error:function(request, status, error){
                alert('로그인이 필요합니다.');
                window.location.replace("https://www.naver.com")
            }

        });
        
    } else if(elem.matches('[data-name="bookmark"]')) {
        console.log('북마크!');

        let pk = elem.getAttribute('name'); // 37

        $.ajax({
            type: 'POST',
            url: 'data/bookmark.json',
            data:{pk},
            dataType:'json',
            success:function(response){
                let bookmarkCount = document.querySelector('#bookmark-count-37');
                bookmarkCount.innerHTML = '북마크' + response.bookmark_count + '개'
            },
            error:function(request, status, error){
                alert('로그인이 필요합니다.');
                window.location.replace("https://www.naver.com")
            }
        });

    } else if(elem.matches('[data-name="comment"]')) {
        let content = document.querySelector('#add-comment-post-37 > input[type=text]').value; /* 여기서 벨류는 input에 들어간 글자들을 말한다. */
    
        if(content.length > 140){
            alert('댓글은 최대 140자 입력 가능합니다. 현재 글자수 : ' + content.length);
            return;
        }

        $.ajax({
            type:'POST',
            url: './comment.html',
            data:{
                'pk' : 37,
                'content': content,
            },
            dataType: 'html',
            success: function(data){
                document.querySelector('#comment-list-ajax-post-37').insertAdjacentHTML('afterbegin', data);
                /* #comment-list-ajax-post-37이라는 id 속성을 가진 요소를 찾아서, 해당 요소의 첫 번째 자식으로 data 변수에 저장된 HTML 콘텐츠를 삽입하는 코드입니다. */
            },
            error: function(request, status, error){
                alert('문제가 발생했습니다.');
            }
        });

        document.querySelector('#add-comment-post-37 > input[type=text]').value = '';
    } else if(elem.matches('[data-name="comment_delete"]')) {
        $.ajax({
            type:'POST',
            url:'data/delete.json',
            data: {
                'pk':37,

            },
            dataType:'json',
            success: function(response){
                if(response.status){ /* status값이 존재 한다면 댓글을 지워라. */
                    let comt = document.querySelector('.comment-detail');
                    comt.remove();
                }
            },
            error: function(request, status, error){
                alert('문제가 발생했습니다.');
                window.location.replace('https://www.naver.com');
            }
        });
    } else if(elem.matches('[data-name="follow"]')) {
        $.ajax({
            type:'POST',
            url:'data/follow.json',
            data:{
                'pk':37,
            },
            dataType:'json',
            success:function(response){
                if(response.status){
                    document.querySelector('input.follow').value = '팔로잉';
                } else {
                    document.querySelector('input.follow').value = '팔로워';
                }
            },
            error: function(request, status, error){
                alert('문제가 발생했습니다.');
                window.location.replace('https://www.naver.com');
            }
        })
    }
    
    // else if(elem.matches('[data-name="share"]')) {
    //     console.log('공유!');
    // } else if(elem.matches('[data-name="more"]')) {
    //     console.log('더보기!');
    // }

    elem.classList.toggle('on');
}

function resizeFunc() {
    if(pageYOffset >= 10){
        // 위치 계산 방법 : 절반 값을 구하고 옮기고 싶은 위치만큼 숫자를 더해준다.
        let calcWidth = (window.innerWidth * 0.5) + 167;
        sidebox.style.left = calcWidth + 'px';
    }

    if(matchMedia('screen and (max-width: 800px)').matches){
    /* 자바스크립트에서 matchMedia를 사용해서 css에서 사용하는 @media를 사용할 수 있습니다. */
        
        /* querySelectorAll을 이용해서 모든 컨텐츠를 가져왔다.
           이제 for문으로 돌면서 모든 컨텐츠들에게 밑에 있는 사진 작아지게 하는 효과를 적용해줄거다. */
        for(let i = 0; i < variableWidth.length; i++){
            variableWidth[i].style.width = window.innerWidth -20 + 'px';
        }
    } else {
        for(let i = 0; i < variableWidth.length; i++){

            if(window.width > 600){ /* 더 빨리 없애기 위해서 if문 작성해줌. */
                variableWidth[i].removeAttribute('style');
            }
        }
    }
}

function scrollFunc() {

    let scrollHeight = pageYOffset + window.innerHeight;
    let documentHeight = document.body.scrollHeight;
    if(pageYOffset >= 10){
        header.classList.add('on');
        sidebox.classList.add('on');

        if(sidebox){
            sidebox.classList.add('on');
        }

        resizeFunc();
    } else {
        header.classList.remove('on');

        if(sidebox){
            sidebox.classList.remove('on');
            sidebox.removeAttribute('style');
        }
    }

    if(scrollHeight >= documentHeight){
        let page = document.querySelector('#page').value;
        document.querySelector('#page').value = parseInt(page) + 1;

        callMorePostAjax(page);

        if(page >= 5){
            return;
        }
    }

}

function callMorePostAjax(page) {

    if(page >= 5){
        return;
    }

    $.ajax({
        type:'POST',
        url:'./post.html',
        data:{
            'page':page,
        },
        dataType:'html',
        success: addMorePostAjax,
        error: function(request, status, error){
            alert('문제가 발생했습니다.');
            window.location.replace('https://www.naver.com');
        }
    })
}

function addMorePostAjax(data){
    delegation.insertAdjacentHTML('beforeend',data);
}

/* 새로고침 했을 때 스크롤 최상단으로 이동. */
setTimeout(function(){
    scrollTo(0,0);
}, 100)

/* 이런 조건문(if(sidebox) .... )을 작성해주는 이유는 sidebox가 없는 html이 있을 수 있잖아요?
예를 들어 yeong.html이 sidebox가 없다고 칩시다. 근데 위에서 sidebox를 건들고 가져온단 말이에요?
그러면 당연히 에러를 발생시키겠죠? 그런겁니다. ㅎㅎ 그래서 밑에서도 if문 적어준거고요. ㅎㅎ
*/
if(delegation){
    delegation.addEventListener('click', delegationFunc);
}

window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc)