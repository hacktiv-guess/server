<template>
  
</template>

<script>
export default {
   methods: {
      joinRoom: () => {
         this.$store.mySocket.emit('joinRoom', {
         roomName: this.roomDetail.roomName,
         username: this.$store.username
         })

         this.$store.mySocket.on('roomJoined', function(roomData) {
         this.$store.room = roomData
         console.log(this.$store.room)
         })
      }
   }
}
</script>

<style>

</style>