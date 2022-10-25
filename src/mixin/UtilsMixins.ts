import {Component, Vue} from 'vue-property-decorator';
import ImageSettingService from '@/views/service/profileImg/ImageSettingService';
import {IAttachFileModel} from '@/views/model/post.model';
import {Utils} from '@/utils/utils';

@Component
export default class UtilsMixins extends Vue {

  /**
   * 프로필 이미지 지정.
   * 만약 프로필 이미지가 지정이 안되어 있다면 내부적으로
   * 'image-a.jpg', 'image-b.jpg', 'image-c.jpg', 'image-d.jpg', 'image-e.jpg'
   * 5개 랜덤 이미지 설정.
   * @param imgUrl
   */
  public getProfileImg(imgUrl: string | null | undefined ): string{
    //프로필 이미지를 세팅 하는 데 있어서 click 등의 이벤트로 인해 데이터 바인딩 즉, 썸네일 이미지가 매번 갱신 된다.
    //따라서 v-once 디렉티브를 사용하여 데이터 변경 시 업데이트 되지 않는 일회성 보간을 수행할 수 있지만, 같은 노드의 바인딩에도 영향을 미친다는 점을 유의해야 합니다.
    return ImageSettingService.getProfileImg( imgUrl );
  }

  /**
   * attachment 인자에서 이미지 파일만 추출
   * @param attachment
   */
  public attachFilePreviewInit(attachment: IAttachFileModel[]): IAttachFileModel[] {
    return attachment.filter((item: IAttachFileModel) => item.contentType !== 'image/png' && item.contentType !== 'image/jpg' && item.contentType !== 'image/jpeg' && item.contentType !== 'image/gif');
  }

  /**
   * attachment 인자에서 첨부 파일만 추출
   * @param attachment
   */
  public imgPreviewInit( attachment: IAttachFileModel[] ): IAttachFileModel[]{
    return attachment.filter((item: IAttachFileModel) => item.contentType === 'image/png' || item.contentType === 'image/jpg' || item.contentType === 'image/jpeg' || item.contentType === 'image/gif');
  }

  public txtAreaEleH( txtAreaEle: HTMLTextAreaElement, txt: string ) {
    // const scheduleDetailAreaTxt=this.$refs.scheduleDetailAreaTxt as HTMLInputElement;

    let txtAreaSizeTotal=0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < txt.length; i++) {
      //영문/한글 섞인 문자를 바이트 수 계산
      txtAreaSizeTotal += Utils.getCharByteSize(txt.charAt(i));
    }
    const lineH=20;
    const maxTxtLen=117; //한줄에 최대한 들어갈 수 있는 텍스트의 바이트 수 - 영문/한글 섞인 계산된 바이트 수
    const lineInLen=txtAreaSizeTotal/maxTxtLen; //maxTxtLen , 즉 몇줄까지 입력되었는 지 라인 수 계산
    const numOfLine: number = (txt.match(/\n/g) || []).length; // 엔터키가 몇개 들어 갔는 지 체크
    const resultH=lineH+( lineInLen+numOfLine)*lineH; //1줄 높이( 20px )+( 텍스트 입력 라인 수+엔터키 개수 ) * 1줄 높이( 20px )

    // txtAreaEle.style.height = String( Utils.autoResizeTextArea(txt) + 'px');
    txtAreaEle.style.height = resultH+'px';
  }

  /**
   * //input click event 발생시키기.
   * @param targetSelector
   * @private
   */
  public inputEventBind( targetSelector: string ) {
    //파일 input 에 클릭 이벤트 붙이기~
    const imgFileInput = document.querySelector(targetSelector) as HTMLInputElement;
    //input click event 발생시키기.
    imgFileInput.dispatchEvent(Utils.createMouseEvent('click'));
  }

}
