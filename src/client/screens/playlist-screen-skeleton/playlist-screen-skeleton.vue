<template>
  <SkeletonTheme
      color="#363a4dcc"
      highlight="#484d66cc"
      tag="main"
      :class="cnPlaylistScreenSkeleton()"
  >
    <div :class="cnPlaylistScreenSkeleton('navigation')">
      <Skeleton
          width="36px"
          height="36px"
          circle
      />

      <Skeleton
          width="36px"
          height="36px"
          circle
      />
    </div>

    <header :class="cnPlaylistScreenSkeleton('header')">
      <Skeleton
          :class="cnPlaylistScreenSkeleton('image')"
          width="160px"
          height="160px"
      />
      <div :class="cnPlaylistScreenSkeleton('header-info')">
        <Skeleton
            width="60px"
            height="10px"
        />

        <Skeleton
            :class="cnPlaylistScreenSkeleton('header-title')"
            width="120px"
            height="18px"
        />

        <Skeleton
            :class="cnPlaylistScreenSkeleton('header-additional')"
            width="320px"
            height="12px"
        />

        <div :class="cnPlaylistScreenSkeleton('controls')">
          <Skeleton
              :class="cnPlaylistScreenSkeleton('controls-play')"
              width="187px"
              height="43px"
          />
        </div>
      </div>
    </header>
    <TracksTableSkeleton/>
  </SkeletonTheme>
</template>

<script setup lang="ts">
import {cnPlaylistScreenSkeleton} from './playlist-screen-skeleton.const';
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';
import TracksTableSkeleton from '~/client/shared/components/tracks-table-skeleton/tracks-table-skeleton.vue';
</script>

<style lang="scss">
.playlist-screen-skeleton {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;

  &__navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  &__header {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-top: -8px;

    &-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    &-additional {
      margin-top: 6px;
    }

    &-title {
      margin-top: -2px;
    }
  }

  &__controls {
    &-play span {
      border-radius: 999px;
    }
  }
}
</style>
