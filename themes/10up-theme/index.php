<?php

/**
 * The main template file
 *
 * @package TenUpTheme
 */

get_header(); ?>

<?php if (have_posts()) : ?>
	<?php while (have_posts()) : the_post(); ?>
		<h2><?php the_title(); ?></h2>
		<div class="grid flex-row">
			<div>1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
			<div>5</div>
		</div>
		<article>
			<?php the_content(); ?>
		</article>
		
	<?php endwhile; ?>
<?php endif; ?>

<?php
get_footer();
