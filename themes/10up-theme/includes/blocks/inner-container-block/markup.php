<?php

/**
 * Example block markup
 *
 * @package TenUpTheme\Blocks\Example
 *
 * @var array    $attributes         Block attributes.
 * @var string   $content            Block content.
 * @var WP_Block $block              Block instance.
 * @var array    $context            Block context.
 */

?>
<div <?php echo get_block_wrapper_attributes(array('class' => 'container flex flex-wrap ' . esc_attr($attributes['maxWidth']))); // phpcs:ignore 
		?>>
	<?php
	/*
         * the block_content is the HTML generated from innerBlocks
         * it is being created from the save method in JS or the render_callback
         * in PHP and is sanitized.
         *
         * Re-sanitization through `wp_kses_post` causes
         * embed blocks to break, and other core filters don't apply.
         * Therefore, no additional sanitization is done, and it is being output as is.
         */
	echo $content; // phpcs:disable
	?>
</div>