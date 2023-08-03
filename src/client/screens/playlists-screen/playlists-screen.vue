<template>
  <main :class="cnPlaylistsScreen()">
    <ContentBlock title="Плейлисты">
      <Fragment v-if="vm.pending.get('init')">
        <PlaylistCardSkeleton
            v-for="i in 10"
            :key="i"
        />
      </Fragment>
      <Fragment v-else>
        <PlaylistCard
            v-for="playlist in vm.playlists"
            :key="playlist.playlistUuid"
            :playlist="playlist"
            show-tracks-count
        />
      </Fragment>
    </ContentBlock>

    <ContentBlock title="Вам так же понравились эти плейлисты">
      <Fragment v-if="vm.pending.get('init')">
        <PlaylistCardSkeleton
            v-for="i in 10"
            :key="i"
        />
      </Fragment>
      <Fragment v-else>
        <PlaylistCard
            v-for="playlist in vm.playlistsLiked"
            :key="playlist.playlist.playlistUuid"
            :playlist="playlist.playlist"
            show-tracks-count
        />
      </Fragment>
    </ContentBlock>
  </main>
</template>

<script setup lang="ts">
import {PlaylistsScreenVm} from '~/client/screens/playlists-screen/playlists-screen.vm';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import PlaylistCard from '~/client/shared/components/playlist-card/playlist-card.vue';
import {cnPlaylistsScreen} from './playlists-screen.const';
import Fragment from '~/client/shared/components/fragment.vue';
import PlaylistCardSkeleton from '~/client/shared/components/playlist-card-skeleton/playlist-card-skeleton.vue';

const vm = useVm(PlaylistsScreenVm, true);
</script>

<style lang="scss">
.playlists-screen {
  display: flex;
  flex-direction: column;
  gap: 32px;

  .content-block__body {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 168px);
    gap: 8px;
  }
}
</style>
