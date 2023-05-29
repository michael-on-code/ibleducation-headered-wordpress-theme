<?php
$ibl = new IBLEducation()
?>
<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div class="wrap ibleducation-setting-page-container">
		        <div id="icon-themes" class="icon32"></div>  
		        <h2>Settings Page</h2>
		         <!--NEED THE settings_errors below so that the errors/success messages are shown after submission - wasn't working once we started using add_menu_page and stopped using add_options_page so needed this-->
				<?php settings_errors(); ?>  
		        <form method="POST" action="options.php">
                    <div class="form-fields">
	                    <?php
	                    settings_fields( $ibl->_settingsPageGeneralName );
	                    do_settings_sections( $ibl->_settingsPageGeneralName );
	                    ?>
                    </div>

		            <?php submit_button(); ?>  
		        </form> 
</div>