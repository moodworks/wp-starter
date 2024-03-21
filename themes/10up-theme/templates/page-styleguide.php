<?php

/**
 * Template Name: Style Guide
 *
 * @package TenUpTheme
 */

namespace TenUpTheme\Utility;

use function TenUpTheme\Utility\adjust_brightness;
use function TenUpTheme\Utility\get_colors;

get_header();
?>

<article class="container">
	<h1 class="text-xl">
		<span><?php echo esc_html(get_the_title()); ?></span>
	</h1>

	<div class="content">

		<!-- Colors Section -->
		<?php
		$colors = get_colors('/assets/css/frontend/global/_colors.scss');

		if (!empty($colors)) :
			$item_count = 0; // Initialize item count.
		?>
			<section class="section margin-bottom-lg" id="colors">
				<h2 class="text-lg">Primary Palette</h2>
				<?php foreach ($colors as $name => $hex) : ?>
					<?php if ($item_count % 5 === 0) : ?>
						<?php if ($item_count !== 0) : ?>
	</div>
<?php endif; ?>
<div class="grid">
<?php endif; ?>

<div class="col-2">
	<p class="color-label"><?php echo esc_html($name); ?></p>
	<div class="color-item" style="background-color: <?php echo esc_attr($hex); ?>;"></div>
	<p><?php echo esc_html($hex); ?></p>
</div>

<?php
					++$item_count; // Increase item count
?>
<?php endforeach; ?>
</div> <!-- Make sure to close the last grid div -->
</section>
<?php endif; ?>


<!-- Headings Section -->
<section class="section margin-bottom-lg" id="headings">
	<h2 class="text-lg">Headings</h2>
	<div class="content">
		<h1>H1, Heading 1</h1>
		<h2>H2, Heading 2</h2>
		<h3>H3, Heading 3</h3>
		<h4>H4, Heading 4</h4>
		<h5>H5, Heading 5</h5>
	</div>
</section>

<!-- Body Text Section -->
<section class="section margin-bottom-lg" id="body">
	<h2 class="text-lg">Body</h2>
	<p>This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	<p>This is an <a href="#" class="link">inline link text</a> example.</p>
</section>

<!-- Spacings Section -->
<section class="section margin-bottom-lg" id="spacings">
	<h2 class="text-lg">Spacings</h2>
	<div class="spacing-item bg-primary" style="width: var(--space-xxxxl)"></div>
	<p>XXXXL Spacing</p>
	</div>
	<div class="spacing-item bg-primary" style="width: var(--space-xxxl)"></div>
	<p>XXXL Spacing</p>
	</div>
	<div class="spacing-item bg-primary" style="width: var(--space-xxl)"></div>
	<p>XXL Spacing</p>
	</div>
	<div class="spacing-item bg-primary" style="width: var(--space-xl)"></div>
	<p>XL Spacing</p>
	</div>
	<div class="spacing-item bg-primary" style="width: var(--space-lg)"></div>
	<p>LG Spacing</p>
	</div>
	<div class="spacing-item bg-primary" style="width: var(--space-md)"></div>
	<p>MD Spacing</p>
	</div>
	<div class="spacing-item bg-primary" style="width: var(--space-sm)"></div>
	<p>SM Spacing</p>
	</div>
	<div class="spacing-item bg-primary" style="width: var(--space-xs)"></div>
	<p>XS Spacing</p>
	</div>
	<div class="spacing-item bg-primary" style="width: var(--space-xxs)"></div>
	<p>XXS Spacing</p>
	</div>
	<div class="spacing-item bg-primary" style="width: var(--space-xxxs)"></div>
	<p>XXXS Spacing</p>
	</div>
	<div class="spacing-item bg-primary" style="width: var(--space-xxxxs)"></div>
	<p>XXXXS Spacing</p>
	</div>
</section>

	<!-- Buttons Section -->
	<section class="section margin-bottom-lg" id="buttons">
		<h2 class="text-lg">Buttons</h2>
		<button class="btn">Button</button>
		<button class="btn btn--primary">Primary Button</button>
	</section>

	<!-- Inputs Section -->
	<section class="section margin-bottom-lg" id="inputs">
		<h2 class="text-lg">Inputs</h2>
		<div class="form-group">
			<label for="textInput" class="form-label">Text Input</label>
			<input type="text" id="textInput" class="form-control" placeholder="Text here">
		</div>
		<div class="form-group">
			<label for="passwordInput" class="form-label">Password Input</label>
			<input type="password" id="passwordInput" class="form-control" placeholder="Password">
		</div>
	</section>

	<!-- Lists Section -->
	<section class="section margin-bottom-lg" id="lists">
		<h2 class="text-lg">Lists</h2>
		<ul class="list-style-disc">
			<li>List item one</li>
			<li>List item two
				<ul>
					<li>Nested list item</li>
				</ul>
			</li>
			<li>List item three</li>
		</ul>
		<ol class="list-style-decimal">
			<li>First item</li>
			<li>Second item
				<ol>
					<li>Nested list item</li>
				</ol>
			</li>
			<li>Third item</li>
		</ol>
	</section>

	<!-- Tables Section -->
	<section class="section margin-bottom-lg" id="tables">
		<h2 class="text-lg">Tables</h2>
		<table class="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Item</th>
					<th>Purchase Date</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>Item One</td>
					<td>01/01/2024</td>
					<td>$100</td>
				</tr>
				<tr>
					<td>2</td>
					<td>Item Two</td>
					<td>02/02/2024</td>
					<td>$200</td>
				</tr>
			</tbody>
		</table>
	</section>

	</div>
</article>


<?php get_footer(); ?>