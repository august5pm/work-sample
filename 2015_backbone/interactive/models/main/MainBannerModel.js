App.Models.MainBannerModel = Backbone.Model.extend({
    'default':{
        "type":""   // ��� ���̾� Ÿ��
    }
});

////////////////////////////////////////////////////////
//  ��� ����Ʈ ��
////////////////////////////////////////////////////////
App.Models.MainBannerListModel = Backbone.Model.extend({
    'default':{
        "web_image_url": "",      // �� �̹��� ���
        "mobile_image_url": "",   // ����� ������ ���
        "alt_text": "",         // �̹��� ��Ʈ �ؽ�Ʈ
        "title_text": "",       // Ÿ��Ʋ �ؽ�Ʈ
        "contents_text": "",    // ���� �ؽ�Ʈ
        "link_url": "",         // ��ũ ���
        "link_target": "",      // ��ũ Ÿ��,
        "log_text":""           // �����±�
    }
});