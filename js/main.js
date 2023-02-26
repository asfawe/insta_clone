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
    } else if(elem.matches('[data-name="bookmark"]')) {
        console.log('북마크!');
    } else if(elem.matches('[data-name="share"]')) {
        console.log('공유!');
    } else if(elem.matches('[data-name="more"]')) {
        console.log('더보기!');
    }

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