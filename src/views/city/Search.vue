<template>
        <div class="header__input">
            <input class="header__input__content" placeholder="请输入城市或拼音" type="text">
        </div>
</template>

<script>

export default {
  name: 'Search'
}
</script>

<style lang="scss" scoped>
.header{
    height: 1.6rem;
    line-height: 1.6rem;
    background: #00bcd4 !important;
    &__input{
        width: 100%;
        height: .72rem;
        line-height: .72rem;
        &__content{
            box-sizing: border-box;
            padding: 0 .2rem ;
            display: block;
            margin: 0 auto;
            width: 98%;
            height: 90%;
            text-align: center;
            color: #666;
        }
    }
}
</style>
