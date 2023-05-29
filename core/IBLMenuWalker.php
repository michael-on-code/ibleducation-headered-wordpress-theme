<?php

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

class IBLHeaderLGMenuWalker extends Walker_Nav_Menu{
	function start_el( &$output, $item, $depth = 0, $args = null, $current_object_id = 0 ) {
		//var_dump($args);exit;
		if($depth==0){
			$output.='<div>';
			$output .= '<a  href="' . $item->url . '" class="db_l h-menu-link '.implode(" ", $item->classes).'">';
			$output .= $item->title;
			$output .= '</a>';
		}
	}

	function end_el( &$output, $data_object, $depth = 0, $args = null ) {
		$output.="</div>";
	}
}

class IBLHeaderMobileWalker extends Walker_Nav_Menu{
	function start_el( &$output, $item, $depth = 0, $args = null, $current_object_id = 0 ) {
		if($depth==0){
			$output.='<div class="u-menu">';
			$output .= '<a  href="' . $item->url . '" class="'.implode(" ", $item->classes).'">';
			$output .= $item->title;
			$output .= '</a>';
		}
	}

	function end_el( &$output, $data_object, $depth = 0, $args = null ) {
		$output.="</div>";
	}
}