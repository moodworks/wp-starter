<?php

/**
 * Custom Container block markup
 *
 * @package YourThemeName\Blocks\Container
 *
 * @var array    $attributes         Block attributes.
 * @var string   $content            Block content. Inner blocks HTML.
 * @var WP_Block $block              Block instance.
 * @var array    $context            Block context.
 */

// You might want to adjust the class name based on your needs or attributes.

$wrapper_attributes = get_block_wrapper_attributes(array('class' => 'alignfull'));
?>

<section <?php echo $wrapper_attributes; ?>>
	<?php
	// Output the inner blocks' content directly. WordPress handles sanitization of inner blocks content.
	echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	?>
</section>