<?php

/**
 * The main template file
 *
 * @package TenUpTheme
 */

get_header(); ?>
<div class="split-btn-v2 inline-flex js-split-btn-v2">
	<button class="reset split-btn-v2__btn js-split-btn-v2__btn" aria-controls="split-btn-v2-list">
		<span>Download</span>

		<svg class="split-btn-v2__btn-icon icon icon--xxs margin-left-xxs" viewBox="0 0 12 12">
			<title>Show download options</title>
			<g fill="currentColor">
				<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4l-5 5-5-5"></path>
			</g>
		</svg>
	</button>

	<div class="split-btn-v2__list-wrapper js-split-btn-v2__list-wrapper" id="split-btn-v2-list">
		<div class="split-btn-v2__list">
			<button class="reset split-btn-v2__list-item js-split-btn-v2__item">
				<svg class="icon icon--xs" viewBox="0 0 16 16" aria-hidden="true">
					<g class="split-btn-v2__anim-path">
						<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 2v5"></path>
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7l3 3 3-3H5z" fill="currentColor"></path>
					</g>
					<path d="M14 10v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3" fill="none" opacity=".4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
				</svg>

				<span>Mac Intel (Universal)</span>
			</button>

			<button class="reset split-btn-v2__list-item js-split-btn-v2__item">
				<svg class="icon icon--xs" viewBox="0 0 16 16" aria-hidden="true">
					<g class="split-btn-v2__anim-path">
						<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 2v5"></path>
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7l3 3 3-3H5z" fill="currentColor"></path>
					</g>
					<path d="M14 10v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3" fill="none" opacity=".4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
				</svg>

				<span>Apple Silicon</span>
			</button>
		</div>
	</div>

	<span class="split-btn-v2__morph-bg js-split-btn-v2__morph-bg" aria-hidden="true"></span>
</div>
<?php if (have_posts()) : ?>
	<?php while (have_posts()) : the_post(); ?>
		<h2><?php the_title(); ?></h2>
		<?php the_content(); ?>
	<?php endwhile; ?>
<?php endif; ?>

<?php
get_footer();
