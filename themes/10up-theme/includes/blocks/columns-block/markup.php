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

$maxWidthSettings        = $attributes['maxWidthSettings'] ?? [];
$isFullWidth             = $attributes['isFullWidth'] ?? false;
$gridGapXSettings        = $attributes['gridGapXSettings'] ?? [];
$gridGapYSettings        = $attributes['gridGapYSettings'] ?? [];
$flexWrapSettings        = $attributes['flexWrapSettings'] ?? [];
$flexDirectionSettings   = $attributes['flexDirectionSettings'] ?? [];
$justifyContentSettings  = $attributes['justifyContentSettings'] ?? [];
$alignItemsSettings      = $attributes['alignItemsSettings'] ?? [];
$paddingSettings         = $attributes['paddingSettings'] ?? [];
$marginSettings          = $attributes['marginSettings'] ?? [];
$spacingClasses = [];

$classes = [
	'grid' => true
];

foreach ($maxWidthSettings as $breakpoint => $value) {
	if (!empty($value)) {
		$breakpointSuffix = $breakpoint ? "@{$breakpoint}" : '';
		$classes["max-width-{$value}{$breakpointSuffix}"] = true;
	}
}

foreach ($gridGapXSettings as $breakpoint => $value) {
	if (!empty($value)) {
		$breakpointSuffix = $breakpoint ? "@{$breakpoint}" : '';
		$classes["gap-x-{$value}{$breakpointSuffix}"] = true;
	}
}

foreach ($gridGapYSettings as $breakpoint => $value) {
	if (!empty($value)) {
		$breakpointSuffix = $breakpoint ? "@{$breakpoint}" : '';
		$classes["gap-y-{$value}{$breakpointSuffix}"] = true;
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

$blockProps = get_block_wrapper_attributes([
	'class' => $isFullWidth ? '' : 'container ' . $blockClasses,
]);

$customProps = $isFullWidth ? 'container ' . $blockClasses . ' ' . $spacingClassString : $blockClasses . ' ' . $spacingClassString;

?>

<?php if ($isFullWidth) : ?>
	<section <?php echo $blockProps; ?>>
		<div class="<?php echo $customProps; ?>">
			<?php echo $content; ?>
		</div>
	</section>
<?php else : ?>
	<section <?php echo $blockProps; ?>>
		<?php echo $content; ?>
	</section>
<?php endif; ?>