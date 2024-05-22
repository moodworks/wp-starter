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

$colSizeSettings = $attributes['colSizeSettings'] ?? [];
$colOffsetSettings = $attributes['colOffsetSettings'] ?? [];
$flexWrapSettings = $attributes['flexWrapSettings'] ?? [];
$flexDirectionSettings = $attributes['flexDirectionSettings'] ?? [];
$justifyContentSettings = $attributes['justifyContentSettings'] ?? [];
$alignItemsSettings = $attributes['alignItemsSettings'] ?? [];
$paddingSettings = $attributes['paddingSettings'] ?? [];
$marginSettings = $attributes['marginSettings'] ?? [];
$spacingClasses = [];

$classes = [];

foreach ($colSizeSettings as $breakpoint => $value) {
	if (!empty($value)) {
		$breakpointSuffix = $breakpoint ? "@{$breakpoint}" : '';
		$classes["col-{$value}{$breakpointSuffix}"] = true;
	}
}

foreach ($colOffsetSettings as $breakpoint => $value) {
	if ($value !== null && $value !== '') {
		$breakpointSuffix = $breakpoint ? "@{$breakpoint}" : '';
		$classes["offset-{$value}{$breakpointSuffix}"] = true;
	}
}

foreach ($flexWrapSettings as $breakpoint => $value) {
	if (!empty($value)) {
		$breakpointSuffix = $breakpoint ? "@{$breakpoint}" : '';
		$classes["{$value}{$breakpointSuffix}"] = true;
	}
}

foreach ($flexDirectionSettings as $breakpoint => $value) {
	if (!empty($value)) {
		$breakpointSuffix = $breakpoint ? "@{$breakpoint}" : '';
		$classes["{$value}{$breakpointSuffix}"] = true;
	}
}

foreach ($justifyContentSettings as $breakpoint => $value) {
	if (!empty($value)) {
		$breakpointSuffix = $breakpoint ? "@{$breakpoint}" : '';
		$classes["{$value}{$breakpointSuffix}"] = true;
	}
}

foreach ($alignItemsSettings as $breakpoint => $value) {
	if (!empty($value)) {
		$breakpointSuffix = $breakpoint ? "@{$breakpoint}" : '';
		$classes["{$value}{$breakpointSuffix}"] = true;
	}
}

foreach ($paddingSettings as $breakpoint => $values) {
	if (!empty($values)) {
		foreach ($values as $spacingOption => $sizeOption) {
			if (!empty($sizeOption)) {
				$className = $breakpoint
					? "{$spacingOption}-{$sizeOption}@{$breakpoint}"
					: "{$spacingOption}-{$sizeOption}";
				$spacingClasses[] = $className;
			}
		}
	}
}

foreach ($marginSettings as $breakpoint => $values) {
	if (!empty($values)) {
		foreach ($values as $spacingOption => $sizeOption) {
			if (!empty($sizeOption)) {
				$className = $breakpoint
					? "margin-{$spacingOption}-{$sizeOption}@{$breakpoint}"
					: "margin-{$spacingOption}-{$sizeOption}";
				$spacingClasses[] = $className;
			}
		}
	}
}

$spacingClassString = implode(' ', $spacingClasses);

$blockClasses = implode(' ', array_keys(array_filter($classes)));
$customProps =  'flex ' . $blockClasses . ' ' . $spacingClassString;

$blockProps = get_block_wrapper_attributes([
	'class' => $customProps,
]);

?>

<div <?php echo $blockProps; // phpcs:ignore 
		?>>
		<?php echo $content; ?>
</div>