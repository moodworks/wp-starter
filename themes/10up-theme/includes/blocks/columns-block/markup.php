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

$attributes = $block->attributes;

$isAutoGridEnabled = isset($attributes['isAutoGridEnabled']) ? $attributes['isAutoGridEnabled'] : false;
$autoGridClass = isset($attributes['autoGridClass']) ? $attributes['autoGridClass'] : '';
$flexWrapClass = isset($attributes['flexWrapClass']) ? $attributes['flexWrapClass'] : '';
$gapClass = isset($attributes['gapClass']) ? $attributes['gapClass'] : '';
$flexDirectionClass = isset($attributes['flexDirectionClass']) ? $attributes['flexDirectionClass'] : '';
$justifyContentClass = isset($attributes['justifyContentClass']) ? $attributes['justifyContentClass'] : '';
$alignItemsClass = isset($attributes['alignItemsClass']) ? $attributes['alignItemsClass'] : '';
$gridColClass = isset($attributes['gridColClass']) ? $attributes['gridColClass'] : '';

// Combine multiple class attributes into a single string
$combined_classes = implode(' ', array_filter([
	$isAutoGridEnabled ? $autoGridClass : 'grid',
	$gridColClass,
	$flexWrapClass,
	$gapClass,
	$flexDirectionClass,
	$justifyContentClass,
	$alignItemsClass
]));

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => $combined_classes
	)
);
?>

<div <?php echo $wrapper_attributes; ?>>
	<?php echo do_blocks($content); ?>
</div>

