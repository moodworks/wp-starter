<?php
/**
 * Utility functions for the theme.
 *
 * This file is for custom helper functions.
 * These should not be confused with WordPress template
 * tags. Template tags typically use prefixing, as opposed
 * to Namespaces.
 *
 * @link https://developer.wordpress.org/themes/basics/template-tags/
 * @package TenUpTheme
 */

namespace TenUpTheme\Utility;

/**
 * Get asset info from extracted asset files
 *
 * @param string $slug Asset slug as defined in build/webpack configuration
 * @param string $attribute Optional attribute to get. Can be version or dependencies
 * @return string|array
 */
function get_asset_info( $slug, $attribute = null ) {
	if ( file_exists( TENUP_THEME_PATH . 'dist/js/' . $slug . '.asset.php' ) ) {
		$asset = require TENUP_THEME_PATH . 'dist/js/' . $slug . '.asset.php';
	} elseif ( file_exists( TENUP_THEME_PATH . 'dist/css/' . $slug . '.asset.php' ) ) {
		$asset = require TENUP_THEME_PATH . 'dist/css/' . $slug . '.asset.php';
	} else {
		return null;
	}

	if ( ! empty( $attribute ) && isset( $asset[ $attribute ] ) ) {
		return $asset[ $attribute ];
	}

	return $asset;
}

/**
 * Extract colors from a CSS or Sass file
 *
 * @param string $path the path to your CSS variables file
 */
function get_colors($path)
{
	$dir = get_stylesheet_directory();

	if (file_exists($dir . $path)) {
		$css_vars = file_get_contents($dir . $path); // phpcs:ignore WordPress.WP.AlternativeFunctions

		// Match the HSL color definitions in the format used in your _colors.scss
		preg_match_all('/@include defineColorHSL\((--color-[a-zA-Z0-9_-]+),\s*(\d+),\s*(\d+)%?,\s*(\d+)%?\);/', $css_vars, $matches);

		// Prepare an array to hold the color values
		$colors = array();
		if (!empty($matches) && !empty($matches[1])) {
			foreach ($matches[1] as $index => $colorName) {
				$h = $matches[2][$index];
				$s = $matches[3][$index];
				$l = $matches[4][$index];
				$colors[$colorName] = "hsl($h, $s%, $l%)";
			}
		}

		return $colors;
	}

	return array(); // Return an empty array if no colors found or file does not exist
}

/**
 * Adjust the brightness of a color (HEX)
 *
 * @param string $hex The hex code for the color
 * @param number $steps amount you want to change the brightness
 * @return string new color with brightness adjusted
 */
function adjust_brightness( $hex, $steps ) {

	// Steps should be between -255 and 255. Negative = darker, positive = lighter
	$steps = max( -255, min( 255, $steps ) );

	// Normalize into a six character long hex string
	$hex = str_replace( '#', '', $hex );
	if ( 3 === strlen( $hex ) ) {
		$hex = str_repeat( substr( $hex, 0, 1 ), 2 ) . str_repeat( substr( $hex, 1, 1 ), 2 ) . str_repeat( substr( $hex, 2, 1 ), 2 );
	}

	// Split into three parts: R, G and B
	$color_parts = str_split( $hex, 2 );
	$return      = '#';

	foreach ( $color_parts as $color ) {
		$color   = hexdec( $color ); // Convert to decimal
		$color   = max( 0, min( 255, $color + $steps ) ); // Adjust color
		$return .= str_pad( dechex( $color ), 2, '0', STR_PAD_LEFT ); // Make two char hex code
	}

	return $return;

}
