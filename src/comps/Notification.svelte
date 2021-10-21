<script>
    import { onMount } from 'svelte';

    const Notification = window.Notification || window.mozNotification || window.webkitNotification;
    const granted = 'granted';

    const promptThePermission = () => {
        Notification.requestPermission(
            function (permission) {
                isGranted = permission === granted;
                if ('permissions' in navigator) {
                    navigator.permissions.query({ name: 'notifications' })
                        .then(function (notificationPerm) {
                            notificationPerm.onchange = function () {
                                isGranted = notificationPerm.state === granted;
                            };
                        });
                }
            }
        );
    }

    let isGranted = false;

    onMount(() => {
        isGranted = Notification.permission === granted;
    });
</script>

{#if !isGranted}
    <button on:click={() => promptThePermission()}>
        <i class="fas fa-bell"></i>
    </button>
{/if}

<style lang="scss">
  @import '../scss/variables';

  button {
    position: fixed;
    left: $space-xl;
    bottom: $space-xl;
    cursor: pointer;
    background: $color-white;
    color: $color-black;
    z-index: z-index('overlay');
    border: none;
    font-size: ms(5);
    border-radius: $border-radius-xl;

    &:hover {
      color: $color-primary;

      i {
        transform: rotate(15deg);
      }
    }
  }
</style>
