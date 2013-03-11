jQuery(document).ready(function(){
    jQuery('#interact-comentar, .comment-reply-link').click(function() {
        jQuery('#sugestao_alteracao').attr('checked', false);
        jQuery('#comment_type').hide();
    });
    
    jQuery('#interact-sugerir').click(function() {
        
        jQuery('#sugestao_alteracao').attr('checked', true);
        jQuery('#comment_type').show();
        jQuery.scrollTo('#respond', {duration: 500});
        return false;
        
    });
    
	jQuery('#select-tema').change(function() {
        
        jQuery('#select-acoes').html('Carregando Ações...');
        
        var tema_id = jQuery(this).val();
        
        jQuery.ajax({
            url: consulta.ajaxurl, 
            type: 'post',
            data: {action: 'get_acoes_do_tema', tema: tema_id},
            success: function(data) {
                jQuery('#select-acoes').html(data);
                jQuery('#select-acoes ul.acoes li').click(function() {
                
                    var check = jQuery(this).children('input');
                    if (check.is(':checked')) {
                        check.attr('checked', false);
                        jQuery(this).removeClass('selected');
                    } else {
                        check.attr('checked', true);
                        jQuery(this).addClass('selected');
                    }
                
                });
            } 
        });
        
    }).change();
    
    //troca de senha
    
    jQuery('#troca_senha_submit').click(function() {
    
        var atual = jQuery('#troca_senha_atual').val();
        var nova = jQuery('#troca_senha').val();
        var nova_confirm = jQuery('#troca_senha_confirm').val();
        
        if (nova != nova_confirm) {
            alert('Nova senha e senha de confirmação estão diferentes');
            return;
        }
        
        if (!atual || !nova || !nova_confirm) {
            alert('Por favor preencha todos os campos');
            return;
        }
        
        jQuery('#troca_senha_atual').attr('disabled', true);
        jQuery('#troca_senha').attr('disabled', true);
        jQuery('#troca_senha_confirm').attr('disabled', true);
        jQuery('#troca_senha_submit').attr('disabled', true);
        
        jQuery('#troca_senha_error').hide();
        jQuery('#troca_senha_success').hide();
        jQuery('#troca_senha_loading').show();
        
        jQuery.ajax({
            url: consulta.ajaxurl, 
            type: 'post',
            data: {action: 'troca_senha', atual: atual, nova: nova, nova_confirm: nova_confirm},
            success: function(data) {
                
                jQuery('#troca_senha_loading').hide();
                
                if (data == 'ok') {
                    jQuery('#troca_senha_success').show();
                } else {
                    alert(data);
                    jQuery('#troca_senha_error').show();
                }
                
                jQuery('#troca_senha_atual').attr('disabled', false);
                jQuery('#troca_senha').attr('disabled', false);
                jQuery('#troca_senha_confirm').attr('disabled', false);
                jQuery('#troca_senha_submit').attr('disabled', false);
                
            }
        });
    });
    
    // TEMPLATE WIDGETS - AJAX
    jQuery('.template-widget-form').live('submit',function(){
        var div_id = jQuery(this).data("div_id");
        jQuery.post(consulta.ajaxurl, jQuery(this).serialize(), function (response) {
            if (response) {
                jQuery('.hl-lightbox-close').click();
                jQuery('#'+div_id).html(response);
            }
        })
        return false;
    });
});
