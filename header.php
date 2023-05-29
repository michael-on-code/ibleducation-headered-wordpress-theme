<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ibleducation
 */
$ibl                  = new IBLEducation();
$iblData              = $ibl->getThemeData();
$assetsUrl            = $ibl->_assetsUrl;
$logoID               = $ibl::maybeNullOrEmpty( $iblData, 'logo' );
$headerImageLinkLogo1 = $ibl::maybeNullOrEmpty( $iblData, 'headerImageLinkLogo1' );
$headerLink1Url       = $ibl::maybeNullOrEmpty( $iblData, 'headerLink1Url' );
$headerImageLinkLogo2 = $ibl::maybeNullOrEmpty( $iblData, 'headerImageLinkLogo2' );
$headerLink2Url       = $ibl::maybeNullOrEmpty( $iblData, 'headerLink2Ur' );
$headerButtonLabel    = $ibl::maybeNullOrEmpty( $iblData, 'headerButtonLabel' );
$headerButtonURL      = $ibl::maybeNullOrEmpty( $iblData, 'headerButtonURL' );


?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
	<?php include( 'header-style.php' ) ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
    <div class="fixed">
        <div data-collapse="medium" data-animation="default" data-duration="400" role="banner"
             class="navbar w-nav">
            <div class="navigation-container w-container">
                <div class="navigation-left">
                    <a href="<?= site_url() ?>" aria-current="page"
                       class="brand current w-nav-brand w--current">
						<?= ! ! $logoID ? wp_get_attachment_image( $logoID, 'full', false, [
							'width' => '217',
							'class' => 'image-7',
						] ) : "" ?>

                    </a>
                </div>
				<?php
				$ibl->showHeaderLGMenu();
				?>


                <div data-w-id="9fce1b4f-d010-cdaf-2b31-8bdb19735b53" class="mobile_menu_btn"><img
                            src="<?= $assetsUrl ?>public/wp-content/themes/ibl-web-ibleducation-theme/img/mob_menu.png"
                            alt="" class="open_menu">
                    <div class="dark_overlay"></div>
                </div>
                <div class="mob_menu_wr">
                    <div class="mob_header">
                        <div class="div-block-54">
                            <a data-w-id="aa0cca57-51bb-6681-c9d1-7a08f4ac8e0b" href="#"
                               class="close_mobile_menu w-inline-block"><img
                                        src="<?= $assetsUrl ?>public/images/cancel.png"
                                        loading="lazy" alt="" class="image-50"></a>
                        </div>
                    </div>
					<?php $ibl->showHeaderMobileMenu() ?>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="top_hidden"></div> -->
    <div class="nav_hidden"></div>