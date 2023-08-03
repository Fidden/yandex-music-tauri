<template>
  <SkeletonTheme
      color="#363a4dcc"
      highlight="#484d66cc"
      :class="cnArtistCardSkeleton()"
  >
    <Skeleton
        :class="cnArtistCardSkeleton('image')"
        width="180px"
        height="180px"
        circle
    />

    <Skeleton
        :class="cnArtistCardSkeleton('title')"
        width="96px"
        height="14px"
    />

    <Skeleton
        :class="cnArtistCardSkeleton('description')"
        width="60px"
        height="12px"
    />
  </SkeletonTheme>
</template>

<script setup lang="ts">
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';
import {cnArtistCardSkeleton} from './artist-card-skeleton.const';
</script>

<style lang="scss">
.artist-card-skeleton {
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    margin-top: 8px;
  }
}
</style>
