<?php

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

class IBLEducation {

	private $_themeName = "IBL Education";
	private $_themeSlug = "ibleducation";
	private $_textDomain = "ibleducation";


	public function __construct() {
		$this->_templateDirectoryUri    = get_template_directory_uri() . '/core/';
		$this->_assetsUrl               = $this->_templateDirectoryUri . "/assets/";
		$this->_settingsPageSlug        = $this->_themeSlug . "_settings";
		$this->_settingsPageSectionID   = $this->_settingsPageSlug . "_section";
		$this->_settingsPageOptionGroup = $this->_settingsPageSlug . "_option_group";
		$this->_settingsPageGeneralName = $this->_settingsPageSlug . "_general_settings";
		$this->_mediaLibraryLoaderID    = $this->_settingsPageSlug . "_media_library";
	}

	public function run() {
		add_action( 'wp_enqueue_scripts', array( $this, "enqueue_public_css_files" ) );
		add_action( 'wp_enqueue_scripts', array( $this, "enqueue_public_javascript_files" ) );
		add_action( 'admin_menu', array( $this, 'addThemeAdminMenu' ), 9 );
		add_action( 'admin_init', array( $this, 'registerAndBuildFields' ) );
		add_action( 'init', [ $this, "register_theme_menu" ] );
	}

	public function getThemeData() {
		return [
			"logo"                 => get_option( $this->getFieldID( "logo" ) ),
			"headerImageLinkLogo1" => get_option( $this->getFieldID( "headerImageLinkLogo1" ) ),
			"headerLink1Url"       => get_option( $this->getFieldID( "headerLink1Url" ) ),
			"headerImageLinkLogo2" => get_option( $this->getFieldID( "headerImageLinkLogo2" ) ),
			"headerLink2Ur"        => get_option( $this->getFieldID( "headerLink2Ur" ) ),
			"headerButtonLabel"    => get_option( $this->getFieldID( "headerButtonLabel" ) ),
			"headerButtonURL"      => get_option( $this->getFieldID( "headerButtonURL" ) ),
		];
	}

	public function getHeaderLGImageAndButtonHTML() {
		ob_start();
		$iblData              = $this->getThemeData();
		$headerImageLinkLogo1 = self::maybeNullOrEmpty( $iblData, 'headerImageLinkLogo1' );
		$headerLink1Url       = self::maybeNullOrEmpty( $iblData, 'headerLink1Url' );
		$headerImageLinkLogo2 = self::maybeNullOrEmpty( $iblData, 'headerImageLinkLogo2' );
		$headerLink2Url       = self::maybeNullOrEmpty( $iblData, 'headerLink2Ur' );
		$headerButtonLabel    = self::maybeNullOrEmpty( $iblData, 'headerButtonLabel' );
		$headerButtonURL      = self::maybeNullOrEmpty( $iblData, 'headerButtonURL' );
		if ( ! ! $headerImageLinkLogo1 && ! ! $headerLink1Url ) {
			?>
            <div>
                <a target="_blank" href="<?= self::convertUrlToGoodUrl( $headerLink1Url ) ?>"
                   class="db_l h-menu-link github-img">
					<?= wp_get_attachment_image( $headerImageLinkLogo1, 'full', false, [
						'class' => 'aws-logo grey-logo',

					] ) ?>
                </a>
            </div>
			<?php
		}
		if ( ! ! $headerImageLinkLogo2 && ! ! $headerLink2Url ) {
			?>
            <div>
                <a target="_blank" href="<?= self::convertUrlToGoodUrl( $headerLink2Url ) ?>"
                   class="db_l h-menu-link github-img">
					<?= wp_get_attachment_image( $headerImageLinkLogo2, 'full', false, [
						'class' => 'aws-logo grey-logo',

					] ) ?>
                </a>
            </div>
			<?php
		}
		if ( ! ! $headerButtonLabel && ! ! $headerButtonURL ) {
			?>
            <a href="<?= self::convertUrlToGoodUrl( $headerButtonURL ) ?>"
               class="button-blue-2 register w-button header-btn-link"><?= $headerButtonLabel ?></a>
			<?php
		}

		return ob_get_clean();
	}

	public function getMobileImageAndButtonHTML() {
		ob_start();
		$iblData              = $this->getThemeData();
		$headerImageLinkLogo1 = self::maybeNullOrEmpty( $iblData, 'headerImageLinkLogo1' );
		$headerLink1Url       = self::maybeNullOrEmpty( $iblData, 'headerLink1Url' );
		$headerImageLinkLogo2 = self::maybeNullOrEmpty( $iblData, 'headerImageLinkLogo2' );
		$headerLink2Url       = self::maybeNullOrEmpty( $iblData, 'headerLink2Ur' );
		$headerButtonLabel    = self::maybeNullOrEmpty( $iblData, 'headerButtonLabel' );
		$headerButtonURL      = self::maybeNullOrEmpty( $iblData, 'headerButtonURL' );
		if ( ! ! $headerImageLinkLogo1 && ! ! $headerLink1Url ) {
			?>
            <div>
                <a target="_blank" href="<?= self::convertUrlToGoodUrl( $headerLink1Url ) ?>"
                   class="db_l h-menu-link github-img mob-g">
					<?= wp_get_attachment_image( $headerImageLinkLogo1, 'full', false, [
						'class' => 'aws-logo grey-logo',

					] ) ?>
                </a>
            </div>
			<?php

		}
		if ( ! ! $headerImageLinkLogo2 && ! ! $headerLink2Url ) {
			?>
            <div>
                <a target="_blank" href="<?= self::convertUrlToGoodUrl( $headerLink2Url ) ?>"
                   class="db_l h-menu-link github-img mob-g">
					<?= wp_get_attachment_image( $headerImageLinkLogo2, 'full', false, [
						'class' => 'aws-logo grey-logo',

					] ) ?>
                </a>
            </div>
			<?php

		}
		if ( ! ! $headerButtonLabel && ! ! $headerButtonURL ) {
			?>
            <a href="<?= self::convertUrlToGoodUrl( $headerButtonURL ) ?>"
               class="button-blue-2 register contact w-button"><?= $headerButtonLabel ?></a>
			<?php
		}

		return ob_get_clean();
	}

	public function showHeaderLGMenu() {
		$location = $this->_themeSlug . '-header-menu';
		if ( has_nav_menu( $location ) ) {
			$htmlSuffix = $this->getHeaderLGImageAndButtonHTML();
			require_once 'IBLMenuWalker.php';
			wp_nav_menu(
				array(
					'theme_location'  => $location,
					'container'       => 'nav',
					'container_class' => 'nav-menu w-nav-menu',
					'container_id'    => '',
					'menu_class'      => 'navigation-right',
					'menu_id'         => '',
					'echo'            => true,
					//'fallback_cb' => 'wp_page_menu',
					'items_wrap'      => '<div class="navigation-right">%3$s ' . $htmlSuffix . '</div>',
					'depth'           => 0,
					'walker'          => new IBLHeaderLGMenuWalker()
				)
			);
		}

	}

	public function showHeaderMobileMenu() {
		$location = $this->_themeSlug . '-mobile-menu';
		if ( has_nav_menu( $location ) ) {
			$htmlSuffix = $this->getMobileImageAndButtonHTML();
			require_once 'IBLMenuWalker.php';
			wp_nav_menu(
				array(
					'theme_location'  => $this->_themeSlug . '-mobile-menu',
					'container'       => 'div',
					'container_class' => 'submenu_div',
					'container_id'    => '',
					'fallback_cb'     => 'wp_page_menu',
					//'menu_class' => 'navigation-right',
					'menu_id'         => '',
					'echo'            => true,
					'items_wrap'      => '<div class="foundation_submenu">%3$s ' . $htmlSuffix . '</div>',
					'depth'           => 0,
					'walker'          => new IBLHeaderMobileWalker()
				)
			);
		}
	}


	public function register_theme_menu() {
		register_nav_menus( array( // Using array to specify more menus if needed
			$this->_themeSlug . '-header-menu' => __( $this->_themeName . ' Header Menu', $this->_textDomain ),
			// Main Header Navigation
			$this->_themeSlug . '-mobile-menu' => __( $this->_themeName . ' Mobile Menu', $this->_textDomain ),
			// Mobile Header Navigation
		) );
	}

	public function enqueue_public_css_files() {
		$file_array = array(
			$this->_themeSlug . "-stylesheet" => $this->_assetsUrl . "public/css/stylesheet.css",
		);
		foreach ( $file_array as $file_key => $file_url ) {
			wp_register_style( $file_key, $file_url, [], time() );
			wp_enqueue_style( $file_key );
		}
	}


	public function enqueue_public_javascript_files() {
		$file_array = array(
			$this->_themeSlug . "-script"     => $this->_assetsUrl . 'public/js/script.js',
			$this->_themeSlug . "-navigation" => $this->_assetsUrl . 'public/wp-content/themes/ibl-web-ibleducation-theme/js/navigation8a54.js',
			$this->_themeSlug . "-webflow"    => $this->_assetsUrl . 'public/wp-content/themes/ibl-web-ibleducation-theme/js/webflow8a54.js',
		);

		foreach ( $file_array as $file_key => $file_url ) {
			wp_register_script( $file_key, $file_url, [ 'jquery' ], time(), true );
			wp_enqueue_script( $file_key );
		}
	}

	public function enqueue_admin_css_files() {
		$file_array = array(
			$this->_settingsPageSlug . "-style" => $this->_assetsUrl . "admin/css/settings.css",
		);

		foreach ( $file_array as $file_key => $file_url ) {
			wp_enqueue_style( $file_key, $file_url, [], "1.002" );
		}
	}

	public function enqueue_admin_javascript_files() {
		$file_array = array(
			$this->_settingsPageSlug => $this->_assetsUrl . 'admin/js/settings.js',
		);

		foreach ( $file_array as $file_key => $file_url ) {
			wp_enqueue_script( $file_key, $file_url, array( 'jquery-ui-core', 'jquery-ui-tabs' ) );
		}
		wp_enqueue_media();
		wp_localize_script( $this->_settingsPageSlug, 'ibleducationJSData', [
			"mediaGalleryLoaderSelector" => $this->_mediaLibraryLoaderID,
			"mediaGalleryButtonText"     => __( "Insert", $this->_textDomain )
		] );
	}

	public function addThemeAdminMenu() {
		$mySettingPage = add_menu_page( __( $this->_themeName . " Theme Settings", $this->_textDomain ), __( $this->_themeName . " Theme Settings", $this->_textDomain ), 'administrator', $this->_settingsPageSlug, array(
			$this,
			'displayThemeSettingsAdminDashboard'
		), $this->_assetsUrl."public/images/icon-dashboard.png", 26 );

		//load JS
		add_action( 'load-' . $mySettingPage, [ $this, "loadSettingsJSAndCSS" ] );
	}

	public function loadSettingsJSAndCSS() {
		add_action( 'admin_enqueue_scripts', [ $this, "enqueue_admin_javascript_files" ] );
		add_action( 'admin_enqueue_scripts', [ $this, "enqueue_admin_css_files" ] );
	}

	public function displayThemeSettingsAdminDashboard() {
		$active_tab = isset( $_GET['tab'] ) ? $_GET['tab'] : 'general';
		if ( isset( $_GET['error_message'] ) ) {
			add_action( 'admin_notices', array( $this, 'settingsPageSettingsMessages' ) );
			do_action( 'admin_notices', $_GET['error_message'] );
		}
		require_once $this->_themeSlug . '-admin-settings-display.php';
	}


	public function settingsPageSettingsMessages( $error_message ) {
		$message       = "";
		$err_code      = "";
		$setting_field = "";
		$type          = 'error';
		switch ( $error_message ) {
			case '1':
				$message       = __( 'There was an error adding this setting. Please try again.  If this persists, shoot us an email.', $this->_textDomain );
				$err_code      = esc_attr( 'settings_page_example_setting' );
				$setting_field = 'settings_page_example_setting';
				break;
		}
		add_settings_error(
			$setting_field,
			$err_code,
			$message,
			$type
		);
	}

	private function getFieldID( $fieldName ) {
		return $this->_settingsPageSlug . "_" . $fieldName;
	}

	public function registerAndBuildFields() {
		/**
		 * First, we add_settings_section. This is necessary since all future settings must belong to one.
		 * Second, add_settings_field
		 * Third, register_setting
		 */
		add_settings_section(
		// ID used to identify this section and with which to register options
			$this->_settingsPageSectionID,
			// Title to be displayed on the administration page
			'',
			// Callback used to render the description of the section
			array( $this, 'setting_page_general_description' ),
			// Page on which to add this section of options
			$this->_settingsPageGeneralName
		);
		unset( $args );
		$fieldsLists = [
			array(
				'type'             => 'media_library',
				'buttonLabel'      => __( "Select Image", $this->_textDomain ),
				//'subtype'          => 'text',
				'id'               => $this->getFieldID( "logo" ),
				'name'             => $this->getFieldID( "logo" ),
				//'required'         => 'true',
				'get_options_list' => '',
				'value_type'       => 'normal',
				'wp_data'          => 'option',
				'title'            => __( "Select Site Logo", $this->_textDomain ),
			),
			array(
				'type'             => 'media_library',
				'buttonLabel'      => __( "Select Image", $this->_textDomain ),
				//'subtype'          => 'text',
				'id'               => $this->getFieldID( "headerImageLinkLogo1" ),
				'name'             => $this->getFieldID( "headerImageLinkLogo1" ),
				//'required'         => 'true',
				'get_options_list' => '',
				'value_type'       => 'normal',
				'wp_data'          => 'option',
				'title'            => __( "Select Header Link 1 Image", $this->_textDomain ),
			),

			array(
				'type'             => 'input',
				'subtype'          => 'url',
				'id'               => $this->getFieldID( "headerLink1Url" ),
				'name'             => $this->getFieldID( "headerLink1Url" ),
				//'required'         => 'true',
				'get_options_list' => '',
				'value_type'       => 'normal',
				'wp_data'          => 'option',
				'title'            => __( "Header Image Link 1", $this->_textDomain ),
			),
			array(
				'type'             => 'media_library',
				'buttonLabel'      => __( "Select Image", $this->_textDomain ),
				//'subtype'          => 'text',
				'id'               => $this->getFieldID( "headerImageLinkLogo2" ),
				'name'             => $this->getFieldID( "headerImageLinkLogo2" ),
				//'required'         => 'true',
				'get_options_list' => '',
				'value_type'       => 'normal',
				'wp_data'          => 'option',
				'title'            => __( "Select Header Link 2 Image", $this->_textDomain ),
			),
			array(
				'type'             => 'input',
				'subtype'          => 'url',
				'id'               => $this->getFieldID( "headerLink2Ur" ),
				'name'             => $this->getFieldID( "headerLink2Ur" ),
				//'required'         => 'true',
				'get_options_list' => '',
				'value_type'       => 'normal',
				'wp_data'          => 'option',
				'title'            => __( "Header Image Link 2", $this->_textDomain ),
			),
			array(
				'type'             => 'input',
				'subtype'          => 'text',
				'id'               => $this->getFieldID( "headerButtonLabel" ),
				'name'             => $this->getFieldID( "headerButtonLabel" ),
				//'required'         => 'true',
				'get_options_list' => '',
				'value_type'       => 'normal',
				'wp_data'          => 'option',
				'title'            => __( "Header Button Label", $this->_textDomain ),
			),
			array(
				'type'             => 'input',
				'subtype'          => 'url',
				'id'               => $this->getFieldID( "headerButtonURL" ),
				'name'             => $this->getFieldID( "headerButtonURL" ),
				//'required'         => 'true',
				'get_options_list' => '',
				'value_type'       => 'normal',
				'wp_data'          => 'option',
				'title'            => __( "Header Button Link", $this->_textDomain ),
			)

		];
		if ( ! empty( $fieldsLists ) ) {
			foreach ( $fieldsLists as $args ) {
				add_settings_field(
					$args["id"],
					$args["title"],
					array( $this, 'settings_page_render_settings_field' ),
					$this->_settingsPageGeneralName,
					$this->_settingsPageSectionID,
					$args
				);
				register_setting(
					$this->_settingsPageGeneralName,
					$args["id"]
				);
			}
		}

	}

	public function setting_page_general_description() {
		echo '<p>These settings apply to this theme functionality.</p>';
	}

	public function settings_page_render_settings_field( $args ) {
		if ( $args['wp_data'] == 'option' ) {
			$wp_data_value = get_option( $args['name'] );
		} elseif ( $args['wp_data'] == 'post_meta' ) {
			$wp_data_value = get_post_meta( $args['post_id'], $args['name'], true );
		}
		/*if($wp_data_value === false){
			$wp_data_value = self::maybeNullOrEmpty($args, "defaultValue", false);
		}*/
		$value    = ( $args['value_type'] == 'serialized' ) ? serialize( $wp_data_value ) : $wp_data_value;
		$required = isset( $args["required"] ) ? 'required=""' : '';
		switch ( $args['type'] ) {
			case "media_library":
				//$value = ! ! esc_attr( $value ) && is_numeric(esc_attr( $value )) ? wp_get_attachment_image_url( $value, "full" ) : "";
				echo '<div class="ibleducation-media-gallery-preview-container">
					<img src="' . ( ! ! esc_attr( $value ) && is_numeric( esc_attr( $value ) ) ? wp_get_attachment_image_url( $value, "full" ) : "" ) . '" class="' . ( ! ! $value ? "" : "is-hidden" ) . '" />
					<input type="hidden" name="' . $args["name"] . '" value="' . esc_attr( $value ) . '" />
					<a href="#" data-title="' . $args["title"] . '" class="' . $this->_mediaLibraryLoaderID . ' button">' . $args["buttonLabel"] . '</a></div>';
				break;

			case "select":
				$options = '<option>' . __( "Select", $this->_textDomain ) . '</option>';
				if ( ! empty( $args["get_options_list"] ) ) {
					foreach ( $args["get_options_list"] as $option ) {
						$selected = esc_attr( $value ) == $option["value"] ? 'selected="1"' : '';
						$options  .= '<option value="' . $option["value"] . '" ' . $selected . '>' . $option["label"] . '</option>';
					}
				}
				echo '<div class="select" ><select name="' . $args["name"] . '" id="' . $args["id"] . '">' . $options . '</select></div>';
				break;
			case 'input':
				if ( $args['subtype'] != 'checkbox' ) {
					$prependStart = ( isset( $args['prepend_value'] ) ) ? '<div class="input-prepend"> <span class="add-on">' . $args['prepend_value'] . '</span>' : '';
					$prependEnd   = ( isset( $args['prepend_value'] ) ) ? '</div>' : '';
					$step         = ( isset( $args['step'] ) ) ? 'step="' . $args['step'] . '"' : '';
					$min          = ( isset( $args['min'] ) ) ? 'min="' . $args['min'] . '"' : '';
					$max          = ( isset( $args['max'] ) ) ? 'max="' . $args['max'] . '"' : '';
					if ( isset( $args['disabled'] ) ) {
						// hide the actual input bc if it was just a disabled input the info saved in the database would be wrong - bc it would pass empty values and wipe the actual information
						echo $prependStart . '<input type="' . $args['subtype'] . '" id="' . $args['id'] . '_disabled" ' . $step . ' ' . $max . ' ' . $min . ' name="' . $args['name'] . '_disabled" size="40" disabled value="' . esc_attr( $value ) . '" /><input type="hidden" id="' . $args['id'] . '" ' . $step . ' ' . $max . ' ' . $min . ' name="' . $args['name'] . '" size="40" value="' . esc_attr( $value ) . '" />' . $prependEnd;
					} else {
						echo $prependStart . '<input type="' . $args['subtype'] . '" id="' . $args['id'] . '" "' . $required . '" ' . $step . ' ' . $max . ' ' . $min . ' name="' . $args['name'] . '" size="40" value="' . esc_attr( $value ) . '" />' . $prependEnd;
					}
					/*<input required="required" '.$disabled.' type="number" step="any" id="'.$this->plugin_name.'_cost2" name="'.$this->plugin_name.'_cost2" value="' . esc_attr( $cost ) . '" size="25" /><input type="hidden" id="'.$this->plugin_name.'_cost" step="any" name="'.$this->plugin_name.'_cost" value="' . esc_attr( $cost ) . '" />*/

				} else {
					$checked = ( $value ) ? 'checked' : '';
					echo '<input type="' . $args['subtype'] . '" id="' . $args['id'] . '" "' . $required . '" name="' . $args['name'] . '" size="40" value="1" ' . $checked . ' />';
				}
				break;
			case 'textarea':
				$prependStart = ( isset( $args['prepend_value'] ) ) ? '<div class="input-prepend"> <span class="add-on">' . $args['prepend_value'] . '</span>' : '';
				$prependEnd   = ( isset( $args['prepend_value'] ) ) ? '</div>' : '';
				if ( isset( $args['disabled'] ) ) {
					// hide the actual input bc if it was just a disabled input the info saved in the database would be wrong - bc it would pass empty values and wipe the actual information
					echo $prependStart . '<textarea type="' . $args['subtype'] . '" id="' . $args['id'] . '_disabled" ' . ' name="' . $args['name'] . '_disabled" size="40" disabled value="' . esc_attr( $value ) . '" /><input type="hidden" id="' . $args['id'] . '" ' . ' name="' . $args['name'] . '" size="40" value="' . esc_attr( $value ) . '" />' . $prependEnd;
				} else {
					echo $prependStart . '<textarea id="' . $args['id'] . '" "' . $required . '" ' . ' name="' . $args['name'] . '" row="' . $args['rows'] . '" >' . esc_attr( $value ) . '</textarea>' . $prependEnd;
				}
				break;
			default:
				# code...
				break;
		}
	}

	static function maybeNullOrEmpty( $element, $property, $defaultValue = "" ) {
		if ( is_object( $element ) ) {
			$element = (array) $element;
		}
		if ( isset( $element[ $property ] ) ) {
			return $element[ $property ];
		} else {
			return $defaultValue;
		}

	}

	static function varDumpPre( $toBeDumped, $exit = false ) {
		echo "<br/><pre>" . var_dump( $toBeDumped ) . "</pre>";
		if ( $exit ) {
			exit;
		}
	}

	static function convertUrlToGoodUrl( $url ) {
		if ( $ret = parse_url( $url ) ) {

			if ( ! isset( $ret["scheme"] ) ) {
				$url = "http://{$url}";
			}
		}

		return $url;
	}


}

$IBLTheme = new IBLEducation();
$IBLTheme->run();
