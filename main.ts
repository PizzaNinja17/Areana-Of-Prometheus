namespace SpriteKind {
    export const cursor = SpriteKind.create()
    export const startButton = SpriteKind.create()
    export const prop = SpriteKind.create()
    export const playerSelect = SpriteKind.create()
    export const hitboxOne = SpriteKind.create()
    export const attackOne = SpriteKind.create()
    export const summonOne = SpriteKind.create()
    export const playerTwo = SpriteKind.create()
    export const hitboxTwo = SpriteKind.create()
    export const attackTwo = SpriteKind.create()
    export const summonTwo = SpriteKind.create()
    export const playerThree = SpriteKind.create()
    export const hitboxThree = SpriteKind.create()
    export const summonThree = SpriteKind.create()
    export const attackThree = SpriteKind.create()
    export const playerFour = SpriteKind.create()
    export const hitboxFour = SpriteKind.create()
    export const attackFour = SpriteKind.create()
    export const summonFour = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.playerThree, SpriteKind.attackTwo, function (sprite, otherSprite) {
    if (!(invinceThree)) {
        playerAttacked(sprite, otherSprite, 3, playerTwoSelection, playerTwoSprite, playerThreeSelection)
    }
})
function shootPosin (whielderSprite: Sprite, target: Sprite, summonNum: number) {
    summonBullet(summonNum, whielderSprite.x, whielderSprite.y, spriteutils.angleFrom(whielderSprite, target), 80, assets.image`spore`)
    extraEffects.createSpreadEffectOnAnchor(bulletSprite, poisinEffect, 2500)
    bulletSprite.lifespan = 2200
    bulletSprite.fx = 15
    bulletSprite.fy = 15
}
function startGameLoad () {
    sprites.destroyAllSpritesOfKind(SpriteKind.playerSelect)
    color.startFade(color.originalPalette, color.Black, 1000)
    scene.cameraShake(4, 2000)
    inMenu = false
    sprites.destroyAllSpritesOfKind(SpriteKind.cursor)
    timer.background(function () {
        pause(1500)
        color.startFade(color.Black, color.originalPalette, 1000)
        loadMap(1)
    })
}
function playerThrow (hitbox: Sprite, state: Sprite, thrown: Sprite, speed: number, mustThrow: boolean) {
    thrown.setPosition(hitbox.x, hitbox.y)
    if (mustThrow) {
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingRight))) {
            thrown.vx = speed
        }
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingLeft))) {
            thrown.vx = speed * -1
        }
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingUp))) {
            thrown.vy = speed * -1
        }
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingDown))) {
            thrown.vy = speed
        }
    } else {
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.MovingRight))) {
            thrown.vx = speed
        }
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.MovingLeft))) {
            thrown.vx = speed * -1
        }
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.MovingUp))) {
            thrown.vy = speed * -1
        }
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.MovingDown))) {
            thrown.vy = speed
        }
    }
}
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Released, function () {
    if (playerExists(4)) {
        if (playerFourSelection == 2) {
            attackingFour = false
        }
    }
})
sprites.onOverlap(SpriteKind.summonTwo, SpriteKind.attackOne, function (sprite, otherSprite) {
    damageSummon(playerOneSelection, otherSprite, sprite)
})
sprites.onOverlap(SpriteKind.summonOne, SpriteKind.attackFour, function (sprite, otherSprite) {
    damageSummon(playerFourSelection, otherSprite, sprite)
})
controller.player3.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (playerExists(3) && !(attackingThree)) {
        if (99 < statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerThreeSprite).value) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerThreeSprite).value += -100
            if (playerThreeSelection == 0) {
                sporeUltimate(playerThreeSprite, playerHitboxThree, 3)
            }
            if (playerThreeSelection == 1) {
                portalUltimate(playerThreeSprite, playerHitboxThree, 3)
            }
            if (playerThreeSelection == 2) {
                syctheUlimate(playerHitboxThree, 3)
            }
            if (playerThreeSelection == 3) {
                dash(playerThreeSprite, playerHitboxThree, 3, 3)
            }
        }
    }
})
function playerHeldDirection (direction: string, playerNum: number) {
    if (playerNum == 1) {
        if (direction == "left") {
            return controller.left.isPressed()
        }
        if (direction == "right") {
            return controller.right.isPressed()
        }
        if (direction == "up") {
            return controller.up.isPressed()
        }
        if (direction == "down") {
            return controller.down.isPressed()
        }
    }
    if (playerNum == 2) {
        if (direction == "left") {
            return controller.player2.isPressed(ControllerButton.Left)
        }
        if (direction == "right") {
            return controller.player2.isPressed(ControllerButton.Right)
        }
        if (direction == "up") {
            return controller.player2.isPressed(ControllerButton.Up)
        }
        if (direction == "down") {
            return controller.player2.isPressed(ControllerButton.Down)
        }
    }
    if (playerNum == 3) {
        if (direction == "left") {
            return controller.player3.isPressed(ControllerButton.Left)
        }
        if (direction == "right") {
            return controller.player3.isPressed(ControllerButton.Right)
        }
        if (direction == "up") {
            return controller.player3.isPressed(ControllerButton.Up)
        }
        if (direction == "down") {
            return controller.player3.isPressed(ControllerButton.Down)
        }
    }
    if (playerNum == 4) {
        if (direction == "left") {
            return controller.player4.isPressed(ControllerButton.Left)
        }
        if (direction == "right") {
            return controller.player4.isPressed(ControllerButton.Right)
        }
        if (direction == "up") {
            return controller.player4.isPressed(ControllerButton.Up)
        }
        if (direction == "down") {
            return controller.player4.isPressed(ControllerButton.Down)
        }
    }
    return false
}
sprites.onOverlap(SpriteKind.playerFour, SpriteKind.attackThree, function (sprite, otherSprite) {
    if (!(invinceThree)) {
        playerAttacked(sprite, otherSprite, 4, playerThreeSelection, playerThreeSprite, playerFourSelection)
    }
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (playerExists(2) && !(attackingTwo)) {
        if (99 < statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerTwoSprite).value) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerTwoSprite).value += -100
            if (playerTwoSelection == 0) {
                sporeUltimate(playerTwoSprite, playerHitboxTwo, 2)
            }
            if (playerTwoSelection == 1) {
                portalUltimate(playerTwoSprite, playerHitboxTwo, 2)
            }
            if (playerTwoSelection == 2) {
                syctheUlimate(playerHitboxTwo, 2)
            }
            if (playerTwoSelection == 3) {
                dash(playerTwoSprite, playerHitboxTwo, 3, 2)
            }
        }
    }
})
function sporeUltimate (user: Sprite, hitbox: Sprite, playerNum: number) {
    if (playerNum == 1) {
        sprites.destroyAllSpritesOfKind(SpriteKind.summonOne)
    }
    if (playerNum == 2) {
        sprites.destroyAllSpritesOfKind(SpriteKind.summonTwo)
    }
    if (playerNum == 3) {
        sprites.destroyAllSpritesOfKind(SpriteKind.summonThree)
    }
    if (playerNum == 4) {
        sprites.destroyAllSpritesOfKind(SpriteKind.summonFour)
    }
    attackSprite = sprites.create(assets.image`spore`, SpriteKind.prop)
    attackSprite.fx = 35
    attackSprite.fy = 35
    summonerBar = statusbars.create(18, 3, StatusBarKind.Health)
    summonerBar.setColor(10, 15, 3)
    summonerBar.max = 1000
    summonerBar.value = 1000
    summonerBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    summonerBar.attachToSprite(attackSprite, 1, 0)
    playerThrow(hitbox, user, attackSprite, 60, false)
    spriteutils.onSpriteUpdateInterval(attackSprite, 100, function (sprite) {
        if (spriteutils.speed(sprite) < 30) {
            sprite.setImage(assets.image`mushroomTurret`)
            sprite.vx = 0
            sprite.vy = 0
            tiles.placeOnTile(sprite, sprite.tilemapLocation())
            if (playerNum == 1) {
                sprite.setKind(SpriteKind.summonOne)
            }
            if (playerNum == 2) {
                sprite.setKind(SpriteKind.summonTwo)
            }
            if (playerNum == 3) {
                sprite.setKind(SpriteKind.summonThree)
            }
            if (playerNum == 4) {
                sprite.setKind(SpriteKind.summonFour)
            }
        }
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value == 0) {
            sprites.destroy(sprite)
        }
    })
    spriteutils.onSpriteUpdateInterval(attackSprite, 650, function (sprite) {
        if (SpriteKind.summonOne == sprite.kind()) {
            for (let value of spriteutils.getSpritesWithin(SpriteKind.playerTwo, 70, sprite)) {
                shootPosin(sprite, value, 1)
            }
            for (let value of spriteutils.getSpritesWithin(SpriteKind.playerThree, 70, sprite)) {
                shootPosin(sprite, value, 1)
            }
            for (let value of spriteutils.getSpritesWithin(SpriteKind.playerFour, 70, sprite)) {
                shootPosin(sprite, value, 1)
            }
        }
        if (SpriteKind.summonTwo == sprite.kind()) {
            for (let value of spriteutils.getSpritesWithin(SpriteKind.Player, 70, sprite)) {
                shootPosin(sprite, value, 2)
            }
            for (let value of spriteutils.getSpritesWithin(SpriteKind.playerThree, 70, sprite)) {
                shootPosin(sprite, value, 2)
            }
            for (let value of spriteutils.getSpritesWithin(SpriteKind.playerFour, 70, sprite)) {
                shootPosin(sprite, value, 2)
            }
        }
        if (SpriteKind.summonThree == sprite.kind()) {
            for (let value of spriteutils.getSpritesWithin(SpriteKind.Player, 70, sprite)) {
                shootPosin(sprite, value, 3)
            }
            for (let value of spriteutils.getSpritesWithin(SpriteKind.playerTwo, 70, sprite)) {
                shootPosin(sprite, value, 3)
            }
            for (let value of spriteutils.getSpritesWithin(SpriteKind.playerFour, 70, sprite)) {
                shootPosin(sprite, value, 4)
            }
        }
        if (SpriteKind.summonFour == sprite.kind()) {
            for (let value of spriteutils.getSpritesWithin(SpriteKind.Player, 70, sprite)) {
                shootPosin(sprite, value, 4)
            }
            for (let value of spriteutils.getSpritesWithin(SpriteKind.playerTwo, 70, sprite)) {
                shootPosin(sprite, value, 4)
            }
            for (let value of spriteutils.getSpritesWithin(SpriteKind.playerThree, 70, sprite)) {
                shootPosin(sprite, value, 4)
            }
        }
    })
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.attackThree, function (sprite, otherSprite) {
    if (!(invinceOne)) {
        playerAttacked(sprite, otherSprite, 1, playerThreeSelection, playerThreeSprite, playerOneSelection)
    }
})
function loadMap (num: number) {
    tiles.setCurrentTilemap(tilemap`level2`)
    loadPlayer(1)
    if (playerTwoSelection != -1) {
        loadPlayer(2)
    }
    if (playerThreeSelection != -1) {
        loadPlayer(3)
    }
    if (playerFourSelection != -1) {
        loadPlayer(4)
    }
}
controller.player4.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (playerExists(4) && !(attackingFour)) {
        if (99 < statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerFourSprite).value) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerFourSprite).value += -100
            if (playerFourSelection == 0) {
                sporeUltimate(playerFourSprite, playerHitboxFour, 4)
            }
            if (playerFourSelection == 1) {
                portalUltimate(playerFourSprite, playerHitboxFour, 4)
            }
            if (playerFourSelection == 2) {
                syctheUlimate(playerFourSprite, 4)
            }
            if (playerFourSelection == 3) {
                dash(playerFourSprite, playerHitboxFour, 3, 4)
            }
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playerExists(1) && !(attackingOne)) {
        if (99 < statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerOneSprite).value) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerOneSprite).value += -100
            if (playerOneSelection == 0) {
                sporeUltimate(playerOneSprite, playerHitboxOne, 1)
            }
            if (playerOneSelection == 1) {
                portalUltimate(playerOneSprite, playerHitboxOne, 1)
            }
            if (playerOneSelection == 2) {
                syctheUlimate(playerHitboxOne, 1)
            }
            if (playerOneSelection == 3) {
                dash(playerOneSprite, playerHitboxOne, 3, 1)
            }
        }
    }
})
sprites.onOverlap(SpriteKind.summonTwo, SpriteKind.attackThree, function (sprite, otherSprite) {
    damageSummon(playerThreeSelection, otherSprite, sprite)
})
sprites.onOverlap(SpriteKind.summonFour, SpriteKind.attackTwo, function (sprite, otherSprite) {
    damageSummon(playerTwoSelection, otherSprite, sprite)
})
sprites.onOverlap(SpriteKind.playerTwo, SpriteKind.attackFour, function (sprite, otherSprite) {
    if (!(invinceTwo)) {
        playerAttacked(sprite, otherSprite, 2, playerFourSelection, playerFourSprite, playerTwoSelection)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playerExists(1) && !(attackingOne)) {
        if (99 < statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerOneSprite).value) {
            if (attackTypeList[playerOneSelection] == 1) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerOneSprite).value += -100
                attackSprite = sprites.create(assets.image`nullImage`, SpriteKind.attackOne)
                attackSprite.z = 2
                animation.runImageAnimation(
                attackSprite,
                attackAnimList[playerOneSelection],
                100,
                true
                )
                if (playerOneSelection == 0) {
                    attackSprite.lifespan = 3500
                    attackSprite.fx = 30
                    attackSprite.fy = 30
                    attackSprite.setFlag(SpriteFlag.DestroyOnWall, true)
                    attackingOne = true
                    extraEffects.createSpreadEffectOnAnchor(attackSprite, poisinEffect, 4000, 70, 8)
                    playerThrow(playerHitboxOne, playerOneSprite, attackSprite, attackSpeedList[playerOneSelection], false)
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerOneSprite).setColor(4, 15, 1)
                    timer.background(function () {
                        pause(400)
                        attackingOne = false
                    })
                }
                if (playerOneSelection == 1) {
                    playerThrow(playerHitboxOne, playerOneSprite, attackSprite, attackSpeedList[playerOneSelection], true)
                    attackSprite.lifespan = 1800
                    attackSprite.setFlag(SpriteFlag.DestroyOnWall, true)
                    extraEffects.createSpreadEffectOnAnchor(attackSprite, fireEffect, 2800, 8, 35)
                    attackingOne = true
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerOneSprite).setColor(4, 15, 1)
                    timer.background(function () {
                        pause(600)
                        attackingOne = false
                    })
                }
            }
            if (attackTypeList[playerOneSelection] == 2) {
                attackingOne = true
            }
            if (attackTypeList[playerOneSelection] == 3) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerOneSprite).value += -100
                shotgun(7, 35, 1, 3, playerOneSprite, playerOneSprite)
            }
        }
    }
})
sprites.onOverlap(SpriteKind.playerTwo, SpriteKind.attackOne, function (sprite, otherSprite) {
    if (!(invinceTwo)) {
        playerAttacked(sprite, otherSprite, 2, playerOneSelection, playerOneSprite, playerTwoSelection)
    }
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (playerExists(2) && !(attackingTwo)) {
        if (99 < statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerTwoSprite).value) {
            if (attackTypeList[playerTwoSelection] == 1) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerTwoSprite).value += -100
                attackSprite = sprites.create(assets.image`nullImage`, SpriteKind.attackTwo)
                attackSprite.z = 2
                animation.runImageAnimation(
                attackSprite,
                attackAnimList[playerTwoSelection],
                100,
                true
                )
                if (playerTwoSelection == 0) {
                    attackSprite.lifespan = 3500
                    attackSprite.fx = 30
                    attackSprite.fy = 30
                    attackSprite.setFlag(SpriteFlag.DestroyOnWall, true)
                    attackingTwo = true
                    extraEffects.createSpreadEffectOnAnchor(attackSprite, poisinEffect, 4000, 70, 8)
                    playerThrow(playerHitboxTwo, playerTwoSprite, attackSprite, attackSpeedList[playerTwoSelection], false)
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerTwoSprite).setColor(4, 15, 1)
                    timer.background(function () {
                        pause(400)
                        attackingTwo = false
                    })
                }
                if (playerTwoSelection == 1) {
                    playerThrow(playerHitboxTwo, playerTwoSprite, attackSprite, attackSpeedList[playerTwoSelection], true)
                    attackSprite.lifespan = 1800
                    attackSprite.setFlag(SpriteFlag.DestroyOnWall, true)
                    extraEffects.createSpreadEffectOnAnchor(attackSprite, fireEffect, 2800, 8, 35)
                    attackingTwo = true
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerTwoSprite).setColor(4, 15, 1)
                    timer.background(function () {
                        pause(600)
                        attackingTwo = false
                    })
                }
            }
            if (attackTypeList[playerTwoSelection] == 2) {
                attackingTwo = true
            }
            if (attackTypeList[playerTwoSelection] == 3) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerTwoSprite).value += -100
                shotgun(7, 35, 2, 3, playerHitboxTwo, playerTwoSprite)
            }
        }
    }
})
function getSummonKind (num: number) {
    if (num == 1) {
        return SpriteKind.summonOne
    }
    if (num == 2) {
        return SpriteKind.summonTwo
    }
    if (num == 3) {
        return SpriteKind.summonThree
    }
    if (num == 4) {
        return SpriteKind.summonFour
    }
    return SpriteKind.summonOne
}
function damageSummon (attackerSelection: number, weaponSprite: Sprite, victumSprite: Sprite) {
    if (attackTypeList[playerOneSelection] == 1) {
        sprites.destroy(weaponSprite)
        damageTaken = damageList[attackerSelection] + Math.round(damageList[attackerSelection] * randint(-0.08, 0.1))
        if (playerOneSelection == 1) {
            damageIndicator(victumSprite.x, victumSprite.y, damageTaken, "o")
        } else {
            damageIndicator(victumSprite.x, victumSprite.y, damageTaken, "")
        }
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, victumSprite).value += damageTaken * -1
    }
    if (attackTypeList[playerOneSelection] == 2) {
        damageTaken = damageList[attackerSelection] + Math.round(damageList[attackerSelection] * randint(-0.08, 0.1))
        damageIndicator(victumSprite.x, victumSprite.y, damageTaken, "")
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, victumSprite).value += damageTaken * -1
    }
}
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Released, function () {
    if (playerExists(2)) {
        if (playerTwoSelection == 2) {
            attackingTwo = false
        }
    }
})
function playerAttacking (num: number) {
    if (num == 1) {
        return attackingOne
    }
    if (num == 2) {
        return attackingTwo
    }
    if (num == 3) {
        return attackingThree
    }
    if (num == 4) {
        return attackingFour
    }
    return false
}
sprites.onDestroyed(SpriteKind.attackThree, function (sprite) {
    if (playerThreeSelection == 0 && sprite.z == 2) {
        summonPosinFeild(sprite.x, sprite.y)
        spriteutils.onSpriteUpdateInterval(propSprite, 100, function (sprite) {
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.Player, 60, sprite), playerThreeSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonOne, 60, sprite), playerThreeSprite, true)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.playerTwo, 60, sprite), playerThreeSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonTwo, 60, sprite), playerThreeSprite, true)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.playerFour, 60, sprite), playerThreeSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonFour, 60, sprite), playerThreeSprite, true)
        })
    }
})
function playerAttributeArrays () {
    playerSpeedList = [
    55,
    60,
    59,
    63
    ]
    ammoList = [
    400,
    300,
    1100,
    200
    ]
    ammoRegenSpeed = [
    4,
    7,
    12,
    7
    ]
    superChargeList = [
    16,
    25,
    9,
    25
    ]
    healthList = [
    2000,
    1850,
    2500,
    1650
    ]
    damageList = [
    100,
    400,
    125,
    95
    ]
    attackSpeedList = [
    75,
    140,
    0,
    75
    ]
    attackTypeList = [
    1,
    1,
    2,
    3
    ]
    attackAnimList = [
    assets.animation`truffleAttack`,
    assets.animation`fireballFread`,
    assets.animation`syctheSpin`,
    [img`
        . . . . . . . . 9 . . . 
        . . . . . . . 9 . . . . 
        . . . . . . 9 . . . . . 
        . . . . . 9 9 . . . . . 
        . . . . 9 9 . . . . . . 
        . . . 9 9 9 . . . . . . 
        . . 9 9 9 9 9 9 . . . . 
        . . . . . 9 9 . . . . . 
        . . . . 9 9 . . . . . . 
        . . . . 9 . . . . . . . 
        . . . 9 . . . . . . . . 
        . . 9 . . . . . . . . . 
        `,img`
        . . . . . . . . 6 . . . 
        . . . . . . . 6 . . . . 
        . . . . . . 6 . . . . . 
        . . . . . 6 6 . . . . . 
        . . . . 6 6 . . . . . . 
        . . . 6 6 6 . . . . . . 
        . . 6 6 6 6 6 6 . . . . 
        . . . . . 6 6 . . . . . 
        . . . . 6 6 . . . . . . 
        . . . . 6 . . . . . . . 
        . . . 6 . . . . . . . . 
        . . 6 . . . . . . . . . 
        `]
    ]
    downMoveAnimList = [
    assets.animation`downMoveMush`,
    assets.animation`downMoveHat`,
    assets.animation`downMoveJack`,
    [img`
        . . . . . . . . . . . f . . . . 
        . . . . . 1 1 1 1 1 1 f . . . . 
        . . . 1 1 1 f f f f f 1 1 . . . 
        . . 1 1 f f f f f f f f 1 1 . . 
        . . 1 f f f 9 f f 9 f f f 1 . . 
        . . 1 f f f 9 f f 9 f f f 1 . . 
        . . 1 1 f f f f f f f f 1 1 . . 
        . . . 1 1 1 f f f f 1 1 1 . . . 
        . . 8 . . 1 1 1 1 1 1 . . 8 . . 
        . 8 8 8 9 . . 1 1 . . 9 8 8 8 . 
        . 1 8 8 8 1 1 1 1 1 1 8 8 8 1 . 
        . 1 . 1 1 1 1 1 1 1 1 1 1 . 1 . 
        . 1 . . 1 1 1 1 1 1 1 1 . d 1 d 
        . f . . . . 8 8 8 8 . . . d 1 d 
        f . f . . . 1 1 1 1 . . . d 9 d 
        f . f . . 1 1 1 1 1 1 . . . 1 . 
        . . . . . 1 f 6 6 f 1 . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . f . . . . 
        . . . . . 1 1 1 1 1 1 f . . . . 
        . . . 1 1 1 f f f f f 1 1 . . . 
        . . 1 1 f f f f f f f f 1 1 . . 
        . . 1 f f f 9 f f 9 f f f 1 . . 
        . . 1 f f f 9 f f 9 f f f 1 . . 
        . . 1 1 f f f f f f f f 1 1 . . 
        . . . 1 1 1 f f f f 1 1 1 . . . 
        . . 8 . . 1 1 1 1 1 1 . . 8 . . 
        . 8 8 8 9 . . 1 1 . . 9 8 8 8 . 
        . 1 8 8 8 1 1 1 1 1 1 8 8 8 1 . 
        . 1 . 1 1 1 1 1 1 1 1 1 1 . 1 . 
        . 1 . . 1 1 1 1 1 1 1 1 . d 1 d 
        . f . . . . 8 8 8 8 . . . d 1 d 
        f . f . . 1 1 1 1 1 1 . . d 9 d 
        f . f . . 1 f 6 6 f 1 . . . 1 . 
        `]
    ]
    rightMoveAnimList = [
    assets.animation`rightMoveMush`,
    assets.animation`rightMoveHat`,
    assets.animation`rightMoveJack`,
    [img`
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . f f . . 
        . . . 1 1 1 f 1 1 . . f . . . . 
        . . . 1 1 1 f f f f f . . . . . 
        . . . 1 1 1 1 1 1 . . f . . . . 
        . . . . 1 1 1 1 1 . . . f f . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . f 1 6 . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        `,img`
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . f f . . 
        . . . 1 1 1 f 1 1 . . f . . . . 
        . . . 1 1 1 f f f f f . . . . . 
        . . . 1 1 1 1 1 1 . . f . . . . 
        . . . . 1 1 1 1 1 . . . f f . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 1 6 . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        `,img`
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . . . . . 
        . . . 1 1 1 f 1 1 . . f f f . . 
        . . . 1 1 1 f f f f f . . . . . 
        . . . 1 1 1 1 1 1 . . f f f . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f f 6 . . . . . . . . 
        `,img`
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . . . . . 
        . . . 1 1 1 f 1 1 . . f . . . . 
        . . . 1 1 1 f f f f f . f f . . 
        . . . 1 1 1 1 1 1 . . f . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 6 f . . . . . . . . 
        `,img`
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . . . . . 
        . . . 1 1 1 f 1 1 . . f . . . . 
        . . . 1 1 1 f f f f f . f f . . 
        . . . 1 1 1 1 1 1 . . f . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . 6 f f . . . . . . . . 
        `,img`
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . . . . . 
        . . . 1 1 1 f 1 1 . . f f f . . 
        . . . 1 1 1 f f f f f . . . . . 
        . . . 1 1 1 1 1 1 . . f f f . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . 6 1 f . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        `,img`
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . f f . . 
        . . . 1 1 1 f 1 1 . . f . . . . 
        . . . 1 1 1 f f f f f . . . . . 
        . . . 1 1 1 1 1 1 . . f . . . . 
        . . . . 1 1 1 1 1 . . . f f . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . 6 1 f . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        `,img`
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . f f . . 
        . . . 1 1 1 f 1 1 . . f . . . . 
        . . . 1 1 1 f f f f f . . . . . 
        . . . 1 1 1 1 1 1 . . f . . . . 
        . . . . 1 1 1 1 1 . . . f f . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        `]
    ]
    leftMoveAnimList = [
    assets.animation`leftMoveMush`,
    assets.animation`leftMoveHat`,
    assets.animation`leftMoveJack`,
    [img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 6 6 9 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . 6 1 f . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f f f . . . . . 
        `,img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 6 6 9 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f f f . . . . . 
        `,img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 6 9 6 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 6 . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f f f . . . . . 
        `,img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 6 9 6 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f 1 6 . . . . . 
        . . . . . . . . f f f . . . . . 
        `,img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 9 6 6 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f f 6 . . . . . 
        `,img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 9 6 6 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f 6 f . . . . . 
        `,img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 6 6 6 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . 6 f f . . . . . 
        `,img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 6 6 6 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . 6 1 f . . . . . 
        . . . . . . . . f f f . . . . . 
        `]
    ]
    upMoveAnimList = [
    assets.animation`upMoveMush`,
    assets.animation`upMoveHat`,
    assets.animation`moveUpJack`,
    [img`
        . . . . . . . . . . . f . . . . 
        . . . . . 1 1 1 1 1 1 f . . . . 
        . . . 1 1 1 1 1 1 1 1 f 1 . . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . 8 . . 1 1 1 1 1 1 . . 8 . . 
        . 8 8 8 9 . . 1 1 . . 9 8 8 8 . 
        . 8 8 1 1 1 1 1 1 1 1 1 1 8 8 . 
        . 1 . 1 1 1 1 1 1 1 1 1 1 . 1 . 
        . 1 . . 1 1 1 1 1 1 1 1 . d 1 d 
        . f . . . . 8 8 8 8 . . . d 1 d 
        f . f . . . 1 1 1 1 . . . d 1 d 
        f . f . . 1 1 1 1 1 1 . . . 1 . 
        . . . . . 1 f 6 6 f 1 . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . f . . . . 
        . . . . . 1 1 1 1 1 1 f . . . . 
        . . . 1 1 1 1 1 1 1 1 f 1 . . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . 8 . . 1 1 1 1 1 1 . . 8 . . 
        . 8 8 8 9 . . 1 1 . . 9 8 8 8 . 
        . 8 8 1 1 1 1 1 1 1 1 1 1 8 8 . 
        . 1 . 1 1 1 1 1 1 1 1 1 1 . 1 . 
        . 1 . . 1 1 1 1 1 1 1 1 . d 1 d 
        . f . . . . 8 8 8 8 . . . d 1 d 
        f . f . . 1 1 1 1 1 1 . . d 1 d 
        f . f . . 1 f 6 6 f 1 . . . 1 . 
        `]
    ]
    downAnimList = [
    assets.animation`downMush`,
    downMoveAnimList[1],
    assets.animation`downJack`,
    downMoveAnimList[3]
    ]
    rightAnimList = [
    assets.animation`rightMush`,
    rightMoveAnimList[1],
    assets.animation`rightJack`,
    [img`
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . f f . . 
        . . . 1 1 1 f 1 1 . . f . . . . 
        . . . 1 1 1 f f f f f . . . . . 
        . . . 1 1 1 1 1 1 . . f . . . . 
        . . . . 1 1 1 1 1 . . . f f . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . f f . . 
        . . . 1 1 1 f 1 1 . . f . . . . 
        . . . 1 1 1 f f f f f . . . . . 
        . . . 1 1 1 1 1 1 . . f . . . . 
        . . . . 1 1 1 1 1 . . . f f . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . . . . . 
        . . . 1 1 1 f 1 1 . . f f f . . 
        . . . 1 1 1 f f f f f . . . . . 
        . . . 1 1 1 1 1 1 . . f f f . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . . . . . 
        . . . 1 1 1 f 1 1 . . f . . . . 
        . . . 1 1 1 f f f f f . f f . . 
        . . . 1 1 1 1 1 1 . . f . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        `,img`
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . . . . . 
        . . . 1 1 1 f 1 1 . . f . . . . 
        . . . 1 1 1 f f f f f . f f . . 
        . . . 1 1 1 1 1 1 . . f . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        `,img`
        . . . . f . . . . . . . . . . . 
        . . . . f 1 1 1 1 . . . . . . . 
        . . . 1 f 1 1 f f . . . . . . . 
        . . . 1 1 1 f f 9 . . . . . . . 
        . . . 1 1 1 f f 8 . . . . . . . 
        . . . 1 1 1 1 f f . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . 1 1 6 1 1 . . . . . . . 
        . . . 1 1 6 f 6 1 . . . . . . . 
        . . . 1 1 1 f 1 1 . . f f f . . 
        . . . 1 1 1 f f f f f . . . . . 
        . . . 1 1 1 1 1 1 . . f f f . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f 1 f . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        `]
    ]
    leftAnimList = [
    assets.animation`leftMush`,
    leftMoveAnimList[1],
    assets.animation`leftJack`,
    [img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 6 6 9 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f f f . . . . . 
        `,img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 6 9 6 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f f f . . . . . 
        `,img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 9 6 6 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f f f . . . . . 
        `,img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 6 6 6 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f f f . . . . . 
        `,img`
        . . . . . . . . . . . f . . . . 
        . . . . . . . 1 1 1 1 f . . . . 
        . . . . . . . f f 1 1 f 1 . . . 
        . . . . . . . 9 f f 1 1 1 . . . 
        . . . . . . . 8 f f 1 1 1 . . . 
        . . . . . . . f f 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . 1 1 6 1 1 . . . . 
        . . . . . . . 1 6 f 6 1 1 . . . 
        . . 1 1 . . . 1 1 f 1 1 1 . . . 
        . 6 6 6 1 f f f f f 1 1 1 . . . 
        . . 1 1 . . . 1 1 1 1 1 1 . . . 
        . . . . . . . 1 1 1 1 1 . . . . 
        . . . . . . . . . 1 . . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f 1 f . . . . . 
        . . . . . . . . f f f . . . . . 
        `]
    ]
    upAnimList = [
    assets.animation`upMush`,
    upMoveAnimList[1],
    assets.animation`upJack`,
    upMoveAnimList[3]
    ]
}
function shotgun (density: number, spread: number, userNum: number, userSelection: number, hitbox: Sprite, state: Sprite) {
    for (let index = 0; index < density; index++) {
        bulletSprite = sprites.create(assets.image`nullImage`, SpriteKind.attackOne)
        animation.runImageAnimation(
        bulletSprite,
        attackAnimList[userSelection],
        200,
        true
        )
        bulletSprite.setPosition(hitbox.x, hitbox.y)
        bulletSprite.setFlag(SpriteFlag.DestroyOnWall, true)
        if (userSelection == 3) {
            extraEffects.createSpreadEffectOnAnchor(bulletSprite, thunderEffect, 3000, 9, 30)
            bulletSprite.lifespan = 2800
        }
        if (userNum == 2) {
            bulletSprite.setKind(SpriteKind.attackTwo)
        }
        if (userNum == 3) {
            bulletSprite.setKind(SpriteKind.attackThree)
        }
        if (userNum == 4) {
            bulletSprite.setKind(SpriteKind.attackFour)
        }
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingUp))) {
            spriteutils.setVelocityAtAngle(bulletSprite, spriteutils.degreesToRadians(270 + randint(spread / -2, spread / 2)), attackSpeedList[userSelection])
        }
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingDown))) {
            spriteutils.setVelocityAtAngle(bulletSprite, spriteutils.degreesToRadians(90 + randint(spread / -2, spread / 2)), attackSpeedList[userSelection])
        }
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingRight))) {
            spriteutils.setVelocityAtAngle(bulletSprite, spriteutils.degreesToRadians(0 + randint(spread / -2, spread / 2)), attackSpeedList[userSelection])
            if (playerHeldDirection("up", userNum)) {
                spriteutils.setVelocityAtAngle(bulletSprite, spriteutils.degreesToRadians(315 + randint(spread / -2, spread / 2)), attackSpeedList[userSelection])
            }
            if (playerHeldDirection("down", userNum)) {
                spriteutils.setVelocityAtAngle(bulletSprite, spriteutils.degreesToRadians(45 + randint(spread / -2, spread / 2)), attackSpeedList[userSelection])
            }
        }
        if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingLeft))) {
            spriteutils.setVelocityAtAngle(bulletSprite, spriteutils.degreesToRadians(180 + randint(spread / -2, spread / 2)), attackSpeedList[userSelection])
            if (playerHeldDirection("up", userNum)) {
                spriteutils.setVelocityAtAngle(bulletSprite, spriteutils.degreesToRadians(225 + randint(spread / -2, spread / 2)), attackSpeedList[userSelection])
            }
            if (playerHeldDirection("down", userNum)) {
                spriteutils.setVelocityAtAngle(bulletSprite, spriteutils.degreesToRadians(135 + randint(spread / -2, spread / 2)), attackSpeedList[userSelection])
            }
        }
    }
}
function damagePlayer (player2: Sprite, perpatrator: Sprite, victumNumber: number, attackSprite: Sprite, perpSelection: number) {
    if (attackTypeList[perpSelection] == 1) {
        sprites.destroy(attackSprite)
        damageTaken = damageList[perpSelection] + Math.round(damageList[perpSelection] * randint(-0.08, 0.1))
        if (perpSelection == 1) {
            damageIndicator(player2.x, player2.y, damageTaken, "o")
        } else {
            damageIndicator(player2.x, player2.y, damageTaken, "")
        }
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, player2).value += damageTaken * -1
        if (victumNumber == 1) {
            invinceOne = true
            timer.background(function () {
                pause(100)
                invinceOne = false
            })
        }
        if (victumNumber == 2) {
            invinceTwo = true
            timer.background(function () {
                pause(100)
                invinceTwo = false
            })
        }
        if (victumNumber == 3) {
            invinceThree = true
            timer.background(function () {
                pause(100)
                invinceThree = false
            })
        }
        if (victumNumber == 4) {
            inviceFour = true
            timer.background(function () {
                pause(100)
                inviceFour = false
            })
        }
    }
    if (attackTypeList[perpSelection] == 2) {
        damageTaken = damageList[perpSelection] + Math.round(damageList[perpSelection] * randint(-0.08, 0.1))
        damageIndicator(player2.x, player2.y, damageTaken, "")
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, player2).value += damageTaken * -1
        if (victumNumber == 1) {
            invinceOne = true
            timer.background(function () {
                pause(150)
                invinceOne = false
            })
        }
        if (victumNumber == 2) {
            invinceTwo = true
            timer.background(function () {
                pause(150)
                invinceTwo = false
            })
        }
        if (victumNumber == 3) {
            invinceThree = true
            timer.background(function () {
                pause(150)
                invinceThree = false
            })
        }
        if (victumNumber == 4) {
            inviceFour = true
            timer.background(function () {
                pause(150)
                inviceFour = false
            })
        }
    }
    if (attackTypeList[perpSelection] == 3) {
        sprites.destroy(attackSprite)
        damageTaken = damageList[perpSelection] + Math.round(damageList[perpSelection] * randint(-0.08, 0.1))
        damageIndicator(player2.x, player2.y, damageTaken, "b")
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, player2).value += damageTaken * -1
    }
}
sprites.onOverlap(SpriteKind.summonFour, SpriteKind.attackThree, function (sprite, otherSprite) {
    damageSummon(playerThreeSelection, otherSprite, sprite)
})
sprites.onOverlap(SpriteKind.playerFour, SpriteKind.attackTwo, function (sprite, otherSprite) {
    if (!(inviceFour)) {
        playerAttacked(sprite, otherSprite, 4, playerTwoSelection, playerTwoSprite, playerFourSelection)
    }
})
function tickCamrea () {
    playerCount = 4
    if (!(playerExists(1))) {
        playerCount += -1
    }
    if (!(playerExists(2))) {
        playerCount += -1
    }
    if (!(playerExists(3))) {
        playerCount += -1
    }
    if (!(playerExists(4))) {
        playerCount += -1
    }
    if (playerCount == 3) {
        if (!(playerExists(1))) {
            splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.VerticalLeftThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.VerticalLeftThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera3, splitScreen.CameraRegion.VerticalMiddleThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera4, splitScreen.CameraRegion.VerticalRightThird)
        }
        if (!(playerExists(2))) {
            splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.VerticalLeftThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.VerticalLeftThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera3, splitScreen.CameraRegion.VerticalMiddleThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera4, splitScreen.CameraRegion.VerticalRightThird)
        }
        if (!(playerExists(3))) {
            splitScreen.setCameraRegion(splitScreen.Camera.Camera3, splitScreen.CameraRegion.VerticalLeftThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.VerticalLeftThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.VerticalMiddleThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera4, splitScreen.CameraRegion.VerticalRightThird)
        }
        if (!(playerExists(4))) {
            splitScreen.setCameraRegion(splitScreen.Camera.Camera4, splitScreen.CameraRegion.VerticalLeftThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.VerticalLeftThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.VerticalMiddleThird)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera3, splitScreen.CameraRegion.VerticalRightThird)
        }
    }
    if (playerCount == 2) {
        if (!(playerExists(1)) && !(playerExists(2))) {
            splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera3, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera4, splitScreen.CameraRegion.VerticalRightHalf)
        }
        if (!(playerExists(1)) && !(playerExists(3))) {
            splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera3, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera4, splitScreen.CameraRegion.VerticalRightHalf)
        }
        if (!(playerExists(1)) && !(playerExists(4))) {
            splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera4, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera3, splitScreen.CameraRegion.VerticalRightHalf)
        }
        if (!(playerExists(2)) && !(playerExists(3))) {
            splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera3, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera4, splitScreen.CameraRegion.VerticalRightHalf)
        }
        if (!(playerExists(2)) && !(playerExists(4))) {
            splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera4, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera3, splitScreen.CameraRegion.VerticalRightHalf)
        }
        if (!(playerExists(3)) && !(playerExists(4))) {
            splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera3, splitScreen.CameraRegion.VerticalLeftHalf)
            splitScreen.setCameraRegion(splitScreen.Camera.Camera4, splitScreen.CameraRegion.VerticalRightHalf)
        }
    }
    if (playerCount == 4) {
        splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.TopLeft)
        splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.TopRight)
        splitScreen.setCameraRegion(splitScreen.Camera.Camera3, splitScreen.CameraRegion.BottomLeft)
        splitScreen.setCameraRegion(splitScreen.Camera.Camera4, splitScreen.CameraRegion.BottomRight)
    }
}
function dash (state: Sprite, hitbox: Sprite, playerSelection: number, userNum: number) {
    if (userNum == 1) {
        controller.moveSprite(hitbox, 0, 0)
    }
    if (userNum == 2) {
        controller.player2.moveSprite(hitbox, 0, 0)
    }
    if (userNum == 3) {
        controller.player3.moveSprite(hitbox, 0, 0)
    }
    if (userNum == 4) {
        controller.player4.moveSprite(hitbox, 0, 0)
    }
    hitbox.vy = 0
    hitbox.vx = 0
    if (playerSelection == 3) {
        extraEffects.createSpreadEffectOnAnchor(hitbox, thunderEffect, 900, 15, 90)
    }
    if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingUp))) {
        hitbox.vy = -170
    }
    if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingDown))) {
        hitbox.vy = 170
    }
    if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingRight))) {
        hitbox.vx = 170
        if (playerHeldDirection("up", userNum)) {
            spriteutils.setVelocityAtAngle(hitbox, spriteutils.degreesToRadians(315), 170)
        }
        if (playerHeldDirection("down", userNum)) {
            spriteutils.setVelocityAtAngle(hitbox, spriteutils.degreesToRadians(45), 170)
        }
    }
    if (characterAnimations.matchesRule(state, characterAnimations.rule(Predicate.FacingLeft))) {
        hitbox.vx = -170
        if (playerHeldDirection("up", userNum)) {
            spriteutils.setVelocityAtAngle(hitbox, spriteutils.degreesToRadians(225), 170)
        }
        if (playerHeldDirection("down", userNum)) {
            spriteutils.setVelocityAtAngle(hitbox, spriteutils.degreesToRadians(135), 170)
        }
    }
    timer.after(380, function () {
        hitbox.vx = 0
        hitbox.vy = 0
        if (userNum == 1) {
            controller.moveSprite(hitbox, playerSpeedList[playerSelection], playerSpeedList[playerSelection])
        }
        if (userNum == 2) {
            controller.player2.moveSprite(hitbox, playerSpeedList[playerSelection], playerSpeedList[playerSelection])
        }
        if (userNum == 3) {
            controller.player3.moveSprite(hitbox, playerSpeedList[playerSelection], playerSpeedList[playerSelection])
        }
        if (userNum == 4) {
            controller.player4.moveSprite(hitbox, playerSpeedList[playerSelection], playerSpeedList[playerSelection])
        }
    })
}
sprites.onOverlap(SpriteKind.playerThree, SpriteKind.attackOne, function (sprite, otherSprite) {
    if (!(invinceThree)) {
        playerAttacked(sprite, otherSprite, 3, playerOneSelection, playerOneSprite, playerThreeSelection)
    }
})
function attachPlayerStatusbars (player2: Sprite, selection: number) {
    for (let index = 0; index <= 2; index++) {
        if (index == 0) {
            statusbar = statusbars.create(20, 1, StatusBarKind.Energy)
            statusbar.setColor(5, 15, 1)
            statusbar.max = ammoList[selection]
            statusbar.value = ammoList[selection]
            statusbar.attachToSprite(player2, 1, 0)
        }
        if (index == 1) {
            statusbar = statusbars.create(20, 2, StatusBarKind.Magic)
            statusbar.setColor(10, 15, 15)
            statusbar.value = 100
            statusbar.attachToSprite(player2, 2, 0)
        }
        if (index == 2) {
            statusbar = statusbars.create(20, 3, StatusBarKind.Health)
            statusbar.setColor(2, 15, 2)
            statusbar.max = healthList[selection]
            statusbar.value = healthList[selection]
            statusbar.attachToSprite(player2, 4, 0)
        }
        statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    }
}
sprites.onOverlap(SpriteKind.playerFour, SpriteKind.attackOne, function (sprite, otherSprite) {
    if (!(inviceFour)) {
        playerAttacked(sprite, otherSprite, 4, playerOneSelection, playerOneSprite, playerFourSelection)
    }
})
sprites.onDestroyed(SpriteKind.attackOne, function (sprite) {
    if (playerOneSelection == 0 && sprite.z == 2) {
        summonPosinFeild(sprite.x, sprite.y)
        spriteutils.onSpriteUpdateInterval(propSprite, 100, function (sprite) {
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.playerTwo, 60, sprite), playerOneSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonTwo, 60, sprite), playerOneSprite, true)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.playerThree, 60, sprite), playerOneSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonThree, 60, sprite), playerOneSprite, true)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.playerFour, 60, sprite), playerOneSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonFour, 60, sprite), playerOneSprite, true)
        })
    }
})
function summonPosinFeild (x: number, y: number) {
    extraEffects.createSpreadEffectAt(extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Spark), x, y, 100)
    propSprite = sprites.create(assets.image`posinSkull`, SpriteKind.prop)
    propSprite.z = 1
    propSprite.setPosition(x, y)
    extraEffects.createSpreadEffectOnAnchor(propSprite, poisinEffect, 4400, 120, 30)
    extraEffects.createSpreadEffectOnAnchor(propSprite, poisinRingEffect, 4400, 60, 80)
    propSprite.lifespan = 4000
}
function tickPoisin (victumsArray: Sprite[], perpetrator: Sprite, summon: boolean) {
    for (let value of victumsArray) {
        damageTaken = randint(14, randint(14, 17))
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, value).value += damageTaken * -1
        damageIndicator(value.x, value.y, damageTaken, "p")
        if (!(summon)) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, perpetrator).value += 1
            if (randint(1, 3) == 3) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, value).value += 1
            }
        }
    }
}
function damageIndicator (x: number, y: number, damageDelt: number, _type: string) {
    damageText = textsprite.create(convertToText(damageDelt))
    damageText.setOutline(2, 15)
    damageText.setFlag(SpriteFlag.GhostThroughWalls, true)
    damageText.setPosition(x, y)
    spriteutils.moveTo(damageText, spriteutils.pos(x + randint(-10, 10), y - randint(30, 50)), 800)
    damageText.lifespan = 900
    if (_type == "p") {
        damageText.setOutline(2, 10)
    }
    if (_type == "r") {
        damageText.setOutline(2, 2)
    }
    if (_type == "o") {
        damageText.setOutline(2, 4)
    }
    if (_type == "b") {
        damageText.setOutline(2, 9)
    }
}
function equipAnimation (player2: Sprite, index: number) {
    characterAnimations.loopFrames(
    player2,
    downMoveAnimList[index],
    200,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    player2,
    rightMoveAnimList[index],
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    player2,
    leftMoveAnimList[index],
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    player2,
    upMoveAnimList[index],
    200,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    player2,
    downAnimList[index],
    400,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    player2,
    rightAnimList[index],
    400,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    player2,
    leftAnimList[index],
    400,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    player2,
    upAnimList[index],
    400,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
}
sprites.onOverlap(SpriteKind.cursor, SpriteKind.startButton, function (sprite, otherSprite) {
    if (playerOneSelection != -1) {
        if (sprites.allOfKind(SpriteKind.cursor).indexOf(sprite) == 0 && controller.A.isPressed()) {
            sprites.destroy(otherSprite, effects.fire, 1000)
            startGameLoad()
        }
        if (sprites.allOfKind(SpriteKind.cursor).indexOf(sprite) == 1 && controller.player2.isPressed(ControllerButton.A)) {
            sprites.destroy(otherSprite, effects.fire, 1000)
            startGameLoad()
        }
        if (sprites.allOfKind(SpriteKind.cursor).indexOf(sprite) == 2 && controller.player3.isPressed(ControllerButton.A)) {
            sprites.destroy(otherSprite, effects.fire, 1000)
            startGameLoad()
        }
        if (sprites.allOfKind(SpriteKind.cursor).indexOf(sprite) == 3 && controller.player4.isPressed(ControllerButton.A)) {
            sprites.destroy(otherSprite, effects.fire, 1000)
            startGameLoad()
        }
    }
})
sprites.onOverlap(SpriteKind.playerTwo, SpriteKind.attackThree, function (sprite, otherSprite) {
    if (!(invinceTwo)) {
        playerAttacked(sprite, otherSprite, 2, playerThreeSelection, playerThreeSprite, playerTwoSelection)
    }
})
function loadPlayer (num: number) {
    splitScreen.setCameraRegion(splitScreen.Camera.Camera1, splitScreen.CameraRegion.VerticalLeftHalf)
    splitScreen.setCameraRegion(splitScreen.Camera.Camera2, splitScreen.CameraRegion.VerticalRightHalf)
    if (num == 1) {
        playerOneSprite = sprites.create(assets.image`placeholderPlayer`, SpriteKind.Player)
        playerOneSprite.vy = 1
        controller.moveSprite(playerOneSprite, 1, 1)
        playerOneSprite.setFlag(SpriteFlag.GhostThroughWalls, true)
        playerOneSprite.z = 3
        playerHitboxOne = sprites.create(assets.image`hitboxPlayer`, SpriteKind.hitboxOne)
        playerHitboxOne.setFlag(SpriteFlag.Invisible, true)
        splitScreen.cameraFollowSprite(splitScreen.Camera.Camera1, playerHitboxOne)
        controller.moveSprite(playerHitboxOne, playerSpeedList[playerOneSelection], playerSpeedList[playerOneSelection])
        equipAnimation(playerOneSprite, playerOneSelection)
        attachPlayerStatusbars(playerOneSprite, playerOneSelection)
        spriteutils.onSpriteUpdateInterval(playerOneSprite, 50, function (sprite) {
            if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, playerOneSprite).value == 0) {
                playerOneDead = true
                sprites.destroy(playerHitboxOne)
                sprites.destroy(sprite)
                sprites.destroyAllSpritesOfKind(SpriteKind.summonOne)
            }
        })
        if (playerOneSelection == 2) {
            equipSycthe(playerOneSprite, 1)
        }
    }
    if (num == 2) {
        playerTwoSprite = sprites.create(assets.image`placeholderPlayer`, SpriteKind.playerTwo)
        controller.player2.moveSprite(playerTwoSprite, 1, 1)
        playerTwoSprite.setFlag(SpriteFlag.GhostThroughWalls, true)
        playerTwoSprite.z = 3
        playerTwoSprite.vy = 1
        playerHitboxTwo = sprites.create(assets.image`hitboxPlayer`, SpriteKind.hitboxTwo)
        playerHitboxTwo.setFlag(SpriteFlag.Invisible, true)
        splitScreen.cameraFollowSprite(splitScreen.Camera.Camera2, playerHitboxTwo)
        controller.player2.moveSprite(playerHitboxTwo, playerSpeedList[playerTwoSelection], playerSpeedList[playerTwoSelection])
        equipAnimation(playerTwoSprite, playerTwoSelection)
        attachPlayerStatusbars(playerTwoSprite, playerTwoSelection)
        spriteutils.onSpriteUpdateInterval(playerTwoSprite, 50, function (sprite) {
            if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, playerTwoSprite).value == 0) {
                playerTwoDead = true
                sprites.destroy(playerHitboxTwo)
                sprites.destroy(sprite)
                sprites.destroyAllSpritesOfKind(SpriteKind.summonTwo)
            }
        })
        if (playerTwoSelection == 2) {
            equipSycthe(playerTwoSprite, 2)
        }
    }
    if (num == 3) {
        playerThreeSprite = sprites.create(img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `, SpriteKind.playerThree)
        controller.player3.moveSprite(playerThreeSprite, 1, 1)
        playerThreeSprite.setFlag(SpriteFlag.GhostThroughWalls, true)
        playerThreeSprite.z = 3
        playerThreeSprite.vy = 1
        playerHitboxThree = sprites.create(assets.image`hitboxPlayer`, SpriteKind.hitboxThree)
        playerHitboxThree.setFlag(SpriteFlag.Invisible, true)
        splitScreen.cameraFollowSprite(splitScreen.Camera.Camera3, playerHitboxThree)
        controller.player3.moveSprite(playerHitboxThree, playerSpeedList[playerThreeSelection], playerSpeedList[playerThreeSelection])
        equipAnimation(playerThreeSprite, playerThreeSelection)
        attachPlayerStatusbars(playerThreeSprite, playerThreeSelection)
        spriteutils.onSpriteUpdateInterval(playerThreeSprite, 50, function (sprite) {
            if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, playerThreeSprite).value == 0) {
                playerThreeDead = true
                sprites.destroy(playerHitboxThree)
                sprites.destroy(sprite)
                sprites.destroyAllSpritesOfKind(SpriteKind.summonThree)
            }
        })
        if (playerThreeSelection == 2) {
            equipSycthe(playerThreeSprite, 3)
        }
    }
    if (num == 4) {
        playerFourSprite = sprites.create(img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `, SpriteKind.playerFour)
        controller.player4.moveSprite(playerFourSprite, 1, 1)
        playerFourSprite.setFlag(SpriteFlag.GhostThroughWalls, true)
        playerFourSprite.z = 3
        playerFourSprite.vy = 1
        playerHitboxFour = sprites.create(assets.image`hitboxPlayer`, SpriteKind.hitboxFour)
        playerHitboxFour.setFlag(SpriteFlag.Invisible, true)
        splitScreen.cameraFollowSprite(splitScreen.Camera.Camera4, playerHitboxFour)
        controller.player4.moveSprite(playerHitboxFour, playerSpeedList[playerFourSelection], playerSpeedList[playerFourSelection])
        equipAnimation(playerFourSprite, playerFourSelection)
        attachPlayerStatusbars(playerFourSprite, playerFourSelection)
        spriteutils.onSpriteUpdateInterval(playerFourSprite, 50, function (sprite) {
            if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, playerFourSprite).value == 0) {
                playerFourDead = true
                sprites.destroy(playerHitboxFour)
                sprites.destroy(sprite)
                sprites.destroyAllSpritesOfKind(SpriteKind.summonFour)
            }
        })
        if (playerFourSelection == 2) {
            equipSycthe(playerFourSprite, 4)
        }
    }
}
sprites.onDestroyed(SpriteKind.attackTwo, function (sprite) {
    if (playerTwoSelection == 0 && sprite.z == 2) {
        summonPosinFeild(sprite.x, sprite.y)
        spriteutils.onSpriteUpdateInterval(propSprite, 100, function (sprite) {
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.Player, 60, sprite), playerTwoSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonOne, 60, sprite), playerTwoSprite, true)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.playerThree, 60, sprite), playerTwoSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonThree, 60, sprite), playerTwoSprite, true)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.playerFour, 60, sprite), playerTwoSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonFour, 60, sprite), playerTwoSprite, true)
        })
    }
})
function portalUltimate (user: Sprite, hitbox: Sprite, playerNum: number) {
    if (sprites.allOfKind(getSummonKind(playerNum)).length == 0) {
        propSprite = sprites.create(assets.image`nullImage`, getSummonKind(playerNum))
        summonerBar = statusbars.create(18, 3, StatusBarKind.Health)
        summonerBar.setColor(10, 15, 3)
        summonerBar.max = 1200
        summonerBar.value = 1200
        summonerBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        summonerBar.attachToSprite(propSprite, 1, 0)
        propSprite.setPosition(hitbox.x, hitbox.y)
        animation.runImageAnimation(
        propSprite,
        assets.animation`hatPortal`,
        400,
        true
        )
        statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, user).value += 100
        spriteutils.onSpriteUpdateInterval(propSprite, 50, function (sprite) {
            if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value == 0) {
                extraEffects.createSpreadEffectAt(extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), sprite.x, sprite.y, 900, 35, 70)
                sprites.destroy(sprite)
                statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, user).value += -100
            }
        })
    } else {
        for (let value of sprites.allOfKind(getSummonKind(playerNum))) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, user).value += -100
            extraEffects.createSpreadEffectOnAnchor(user, hatTeleportEffect, 2000, 17, 65)
            timer.after(800, function () {
                if (spriteutils.isDestroyed(value)) {
                    extraEffects.createSpreadEffectAt(extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), hitbox.x, hitbox.y, 900, 35, 70)
                } else {
                    extraEffects.createSpreadEffectAt(extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Explosion), value.x, value.y, 900, 40, 70)
                    hitbox.setPosition(value.x, value.y)
                    sprites.destroy(value)
                }
            })
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (playerExists(1)) {
        if (playerOneSelection == 2) {
            attackingOne = false
        }
    }
})
function playerExists (num: number) {
    if (num == 1) {
        return !(spriteutils.isDestroyed(playerOneSprite) || playerOneDead) && playerOneSprite
    }
    if (num == 2) {
        return !(spriteutils.isDestroyed(playerTwoSprite) || playerTwoDead) && playerTwoSprite
    }
    if (num == 3) {
        return !(spriteutils.isDestroyed(playerThreeSprite) || playerThreeDead) && playerThreeSprite
    }
    if (num == 4) {
        return !(spriteutils.isDestroyed(playerFourSprite) || playerThreeDead) && playerFourSprite
    }
    return 0
}
function summonBullet (playerNumber: number, x: number, y: number, angle: number, speed: number, image2: Image) {
    if (playerNumber == 1) {
        bulletSprite = sprites.create(image2, SpriteKind.attackOne)
    }
    if (playerNumber == 2) {
        bulletSprite = sprites.create(image2, SpriteKind.attackTwo)
    }
    if (playerNumber == 3) {
        bulletSprite = sprites.create(image2, SpriteKind.attackThree)
    }
    if (playerNumber == 4) {
        bulletSprite = sprites.create(image2, SpriteKind.attackFour)
    }
    bulletSprite.setPosition(x, y)
    spriteutils.setVelocityAtAngle(bulletSprite, angle, speed)
    bulletSprite.setFlag(SpriteFlag.DestroyOnWall, true)
}
sprites.onDestroyed(SpriteKind.attackFour, function (sprite) {
    if (playerFourSelection == 0 && sprite.z == 2) {
        summonPosinFeild(sprite.x, sprite.y)
        spriteutils.onSpriteUpdateInterval(propSprite, 100, function (sprite) {
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.Player, 60, sprite), playerFourSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonOne, 60, sprite), playerFourSprite, true)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.playerTwo, 60, sprite), playerFourSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonTwo, 60, sprite), playerFourSprite, true)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.playerThree, 60, sprite), playerFourSprite, false)
            tickPoisin(spriteutils.getSpritesWithin(SpriteKind.summonThree, 60, sprite), playerFourSprite, true)
        })
    }
})
controller.player3.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Released, function () {
    if (playerExists(3)) {
        if (playerThreeSelection == 2) {
            attackingThree = false
        }
    }
})
function syctheUlimate (hitbox: Sprite, playerNum: number) {
    for (let index = 0; index <= 8; index++) {
        attackSprite = sprites.create(assets.image`syctheImage`, SpriteKind.attackOne)
        attackSprite.setPosition(hitbox.x, hitbox.y)
        spriteutils.setVelocityAtAngle(attackSprite, spriteutils.degreesToRadians(index * 40), 50)
        attackSprite.lifespan = 3000
        attackSprite.setFlag(SpriteFlag.BounceOnWall, true)
        if (playerNum == 2) {
            attackSprite.setKind(SpriteKind.attackTwo)
        }
        if (playerNum == 3) {
            attackSprite.setKind(SpriteKind.attackThree)
        }
        if (playerNum == 4) {
            attackSprite.setKind(SpriteKind.attackFour)
        }
        animation.runImageAnimation(
        attackSprite,
        [img`
            . . . . . . . . . a . . 
            . . . . . . . . a 3 3 . 
            . . . . . . . a . 3 3 3 
            . . . . . . a . . 3 3 3 
            . . . . . . a . . 3 3 3 
            . . . . . a . . . . 3 3 
            . . . . a . . . . . 3 3 
            . . . a . . . . . 3 3 . 
            . . . a . . . . . . . . 
            . . a . . . . . . . . . 
            . a . . . . . . . . . . 
            a . . . . . . . . . . . 
            `,img`
            a . . . . . . . . . . . 
            . a . . . . . . . . . . 
            . . a . . . . . . . . . 
            . . . a a . . . . . . . 
            . . . . . a . . . . . . 
            . . . . . . a . . . . . 
            . . . . . . . a a . . . 
            . . . . . . . . . a . . 
            . . . . . . . . . . a . 
            . . . . 3 . . 3 3 3 3 a 
            . . . . 3 3 3 3 3 3 3 . 
            . . . . . 3 3 3 3 3 . . 
            `,img`
            . . . . . . . . . . . a 
            . . . . . . . . . . a . 
            . . . . . . . . . a . . 
            . . . . . . . . a . . . 
            . 3 3 . . . . . a . . . 
            3 3 . . . . . a . . . . 
            3 3 . . . . a . . . . . 
            3 3 3 . . a . . . . . . 
            3 3 3 . . a . . . . . . 
            3 3 3 . a . . . . . . . 
            . 3 3 a . . . . . . . . 
            . . a . . . . . . . . . 
            `,img`
            . . 3 3 3 3 3 . . . . . 
            . 3 3 3 3 3 3 3 . . . . 
            a 3 3 3 3 . . 3 . . . . 
            . a . . . . . . . . . . 
            . . a . . . . . . . . . 
            . . . a a . . . . . . . 
            . . . . . a . . . . . . 
            . . . . . . a . . . . . 
            . . . . . . . a a . . . 
            . . . . . . . . . a . . 
            . . . . . . . . . . a . 
            . . . . . . . . . . . a 
            `],
        100,
        true
        )
        spriteutils.onSpriteUpdateInterval(attackSprite, 1500, function (sprite) {
            spriteutils.setVelocityAtAngle(sprite, spriteutils.heading(sprite), spriteutils.speed(sprite) * -1)
        })
    }
}
function selectScreen () {
    inMenu = true
    for (let index = 0; index <= 3; index++) {
        if (index == 0) {
            cursorSprite = sprites.create(assets.image`cursorOne`, SpriteKind.cursor)
            controller.moveSprite(cursorSprite, 400, 400)
        }
        if (index == 1) {
            cursorSprite = sprites.create(assets.image`cursorTwo`, SpriteKind.cursor)
            controller.player2.moveSprite(cursorSprite, 400, 400)
        }
        if (index == 2) {
            cursorSprite = sprites.create(assets.image`cursorThree`, SpriteKind.cursor)
            controller.player3.moveSprite(cursorSprite, 400, 400)
        }
        if (index == 3) {
            cursorSprite = sprites.create(assets.image`cursorFour`, SpriteKind.cursor)
            controller.player4.moveSprite(cursorSprite, 400, 400)
        }
        cursorSprite.x += -24
        cursorSprite.x += index * 14
        cursorSprite.z = 1
        cursorSprite.setFlag(SpriteFlag.StayInScreen, true)
    }
    startButton = sprites.create(assets.image`startButton`, SpriteKind.startButton)
    startButton.y = 280
    for (let index = 0; index <= 4; index++) {
        menuText = textsprite.create("")
        menuText.setPosition(40, 89)
        menuText.x += index * 65
        spriteutils.onSpriteUpdateInterval(menuText, 100, function (sprite) {
            if (!(inMenu)) {
                sprites.destroy(sprite)
            }
        })
        if (index == 0) {
            selectionSprite = sprites.create(assets.image`mushSelection`, SpriteKind.playerSelect)
            menuText.setText("Truffle")
        }
        if (index == 1) {
            selectionSprite = sprites.create(assets.image`hatSelection`, SpriteKind.playerSelect)
            menuText.setText("Hattie")
        }
        if (index == 2) {
            selectionSprite = sprites.create(assets.image`selectionJack`, SpriteKind.playerSelect)
            menuText.setText("Cantalantern")
            menuText.x += -14
        }
        if (index == 3) {
            selectionSprite = sprites.create(assets.image`robotSelection`, SpriteKind.playerSelect)
            menuText.setText("Nez-Bot")
        }
        if (index == 4) {
            selectionSprite = sprites.create(img`
                .11111111111111111111111111111111111111.
                1ffffffffffffffffffffffffffffffffffffff1
                1ff1ff1ff1fffffffffffffffffffffffffffff1
                1f1ff1ff1ffffffffffffffffffffffffffffff1
                1fff1ff1fffffffffffffffffffffffffffffff1
                1ff1ff1fffffffcccccccccccffffffffffffff1
                1f1ff1ffffffcc99999999999ccffffffffffff1
                1fff1fffffcc991111111111199ccffffffffff1
                1ff1fffffc9911111111111111199cfffffffff1
                1f1fffffc911111111111199999fffcffffffff1
                1ffffffc91111111111199fffffffffcfffffff1
                1fffffc9111111111119ffffffffffffcffffff1
                1fffffc911111111119fffffff1fff1fcffffff1
                1ffffc911111111119ffff5ffffffffffcfffff1
                1ffffc91111111119ffff555fffffffffcfffff1
                1fffc911111111119fffff5fffffffffffcffff1
                1fffc91111111119ffffffffffffffffffcffff1
                1fffc91111111119fffffffffff1fff5ffcffff1
                1fffc91111111119fff1ffffffffff555fcffff1
                1fffc91111111119fffffffffffffff5ffcffff1
                1fffc91111111119ffffffff1fffffffffcffff1
                1fffc911111111119fffffffffff1fffffcffff1
                1fffc911111111119ffff1ffffffffffffcffff1
                1fffc9111111111119fffffffffffffff9cffff1
                1fffc9111111111119fffffffffffff1f9cffff1
                1fffc9111111111119ffffffff5ffffff9cffff1
                1ffffc9111111111119fff1ff555fff99cfffff1
                1ffffc91111111111119ffffff5fff919cfffff1
                1fffffc91111111111119999ffff9919cffffff1
                1fffffc9111111111111111199991119cffffff1
                1ffffffc91111111111111111111119cfffffff1
                1fffffffc911111111111111111119cffffffff1
                1ffffffffc9911111111111111199cfffffffff1
                1fffffffffcc991111111111199ccffffffffff1
                1fffffffffffcc99999999999ccffffffffffff1
                1fffffffffffffcccccccccccffffffffffffff1
                1ffffffffffffffffffffffffffffffffffffff1
                1ffffffffffffffffffffffffffffffffffffff1
                1ffffffffffffffffffffffffffffffffffffff1
                .11111111111111111111111111111111111111.
                `, SpriteKind.playerSelect)
            menuText.setText("Crescent")
        }
        selectionSprite.setPosition(60, 60)
        selectionSprite.x += index * 65
    }
    scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`selectScreenStars`)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer2, assets.image`selectParalax1`)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer3, assets.image`selectParalax2`)
    scroller.scrollBackgroundWithSpeed(-20, 0, scroller.BackgroundLayer.Layer1)
    scroller.scrollBackgroundWithSpeed(-50, 0, scroller.BackgroundLayer.Layer2)
    scroller.scrollBackgroundWithSpeed(-75, 0, scroller.BackgroundLayer.Layer3)
    for (let index = 0; index <= 3; index++) {
        propSprite = sprites.create(assets.image`noSelectionOne`, SpriteKind.prop)
        propSprite.setPosition(50, 172)
        propSprite.x += scene.screenWidth() / 4 * index
        if (index == 0) {
            spriteutils.onSpriteUpdateInterval(propSprite, 100, function (sprite) {
                if (playerOneSelection == -1) {
                    sprite.setImage(assets.image`noSelectionOne`)
                }
                if (playerOneSelection == 0) {
                    sprite.setImage(img`
                        ................
                        .....212222.....
                        ...2222221222...
                        ..222122222212..
                        .21222222222222.
                        2222fff11fff1222
                        1221f1f11f1f2221
                        2222ddd11ddd2222
                        .22111111111121.
                        ...1111111111...
                        ....11fff111....
                        ..111111111111..
                        ..1.1dddddd1.1..
                        ..1.1dddddd1.1..
                        ..1.dd....dd.1..
                        ....d......d....
                        ....d......d....
                        2222222222222222
                        ................
                        ..222222222222..
                        `)
                }
                if (playerOneSelection == 1) {
                    sprite.setImage(img`
                        ................
                        ................
                        ................
                        ................
                        ................
                        ........888.....
                        .......89998....
                        ......8999998...
                        .....89999998...
                        .ddd.899999ddd..
                        d111d99999d111d.
                        d1f1d99999d1f1d8
                        d1f1d99999d1f1d8
                        d111d95555d111d.
                        .ddd8852258ddd..
                        .89999555599998.
                        8888888888888888
                        2222222222222222
                        ................
                        .22222222222222.
                        `)
                }
                if (playerOneSelection == 2) {
                    sprite.setImage(img`
                        ................
                        ........f.......
                        .......f6f......
                        ..ffffff6fffff..
                        .ff7777777777ff.
                        ff7d7d7d7d7dddff
                        f7d7dfd7d7fddddf
                        fd7dfffd7fffdddf
                        f7d7fdfddfdfdddf
                        fddddddddddddddf
                        fdfffdffffdfffdf
                        fdffffffffffffdf
                        fddffffffffffddf
                        .fddddddddddddf.
                        ..ffffffffffff..
                        ...7676667666...
                        ....67....67....
                        2222222222222222
                        ................
                        .22222222222222.
                        `)
                }
                if (playerOneSelection == 3) {
                    sprite.setImage(img`
                        ...........b....
                        .....111111b....
                        ...111fffff11...
                        ..11ffffffff11..
                        ..1fff9ff9fff1..
                        ..1fff9ff9fff1..
                        ..11ffffffff11..
                        ...111ffff111...
                        ..8..111111..8..
                        .8889..11..9888.
                        .18881111118881.
                        .1.1111111111.1.
                        .1..11111111.d1d
                        .e....8888...d1d
                        e.e...1111...d9d
                        e.e..111111...1.
                        .....1beeb1.....
                        2222222222222222
                        ................
                        .22222222222222.
                        `)
                }
                if (!(inMenu)) {
                    sprites.destroy(sprite)
                }
            })
        }
        if (index == 1) {
            spriteutils.onSpriteUpdateInterval(propSprite, 100, function (sprite) {
                if (playerTwoSelection == -1) {
                    sprite.setImage(assets.image`noSelectionTwo`)
                }
                if (playerTwoSelection == 0) {
                    sprite.setImage(img`
                        ................
                        .....212222.....
                        ...2222221222...
                        ..222122222212..
                        .21222222222222.
                        2222fff11fff1222
                        1221f1f11f1f2221
                        2222ddd11ddd2222
                        .22111111111121.
                        ...1111111111...
                        ....11fff111....
                        ..111111111111..
                        ..1.1dddddd1.1..
                        ..1.1dddddd1.1..
                        ..1.dd....dd.1..
                        ....d......d....
                        ....d......d....
                        8888888888888888
                        ................
                        ..888888888888..
                        `)
                }
                if (playerTwoSelection == 1) {
                    sprite.setImage(assets.image`hatSelectionTwo`)
                }
                if (playerTwoSelection == 2) {
                    sprite.setImage(img`
                        ................
                        ........f.......
                        .......f6f......
                        ..ffffff6fffff..
                        .ff7777777777ff.
                        ff7d7d7d7d7dddff
                        f7d7dfd7d7fddddf
                        fd7dfffd7fffdddf
                        f7d7fdfddfdfdddf
                        fddddddddddddddf
                        fdfffdffffdfffdf
                        fdffffffffffffdf
                        fddffffffffffddf
                        .fddddddddddddf.
                        ..ffffffffffff..
                        ...7676667666...
                        ....67....67....
                        8888888888888888
                        ................
                        .88888888888888.
                        `)
                }
                if (playerTwoSelection == 3) {
                    sprite.setImage(img`
                        ...........b....
                        .....111111b....
                        ...111fffff11...
                        ..11ffffffff11..
                        ..1fff9ff9fff1..
                        ..1fff9ff9fff1..
                        ..11ffffffff11..
                        ...111ffff111...
                        ..8..111111..8..
                        .8889..11..9888.
                        .18881111118881.
                        .1.1111111111.1.
                        .1..11111111.d1d
                        .e....8888...d1d
                        e.e...1111...d9d
                        e.e..111111...1.
                        .....1beeb1.....
                        8888888888888888
                        ................
                        .88888888888888.
                        `)
                }
                if (!(inMenu)) {
                    sprites.destroy(sprite)
                }
            })
        }
        if (index == 2) {
            spriteutils.onSpriteUpdateInterval(propSprite, 100, function (sprite) {
                if (playerThreeSelection == -1) {
                    sprite.setImage(assets.image`noSelectionThree`)
                }
                if (playerThreeSelection == 0) {
                    sprite.setImage(img`
                        ................
                        .....212222.....
                        ...2222221222...
                        ..222122222212..
                        .21222222222222.
                        2222fff11fff1222
                        1221f1f11f1f2221
                        2222ddd11ddd2222
                        .22111111111121.
                        ...1111111111...
                        ....11fff111....
                        ..111111111111..
                        ..1.1dddddd1.1..
                        ..1.1dddddd1.1..
                        ..1.dd....dd.1..
                        ....d......d....
                        ....d......d....
                        5555555555555555
                        ................
                        ..555555555555..
                        `)
                }
                if (playerThreeSelection == 1) {
                    sprite.setImage(img`
                        ................
                        ................
                        ................
                        ................
                        ................
                        ........888.....
                        .......89998....
                        ......8999998...
                        .....89999998...
                        .ddd.899999ddd..
                        d111d99999d111d.
                        d1f1d99999d1f1d8
                        d1f1d99999d1f1d8
                        d111d95555d111d.
                        .ddd8852258ddd..
                        .89999555599998.
                        8888888888888888
                        5555555555555555
                        ................
                        .55555555555555.
                        `)
                }
                if (playerThreeSelection == 2) {
                    sprite.setImage(img`
                        ................
                        ........f.......
                        .......f6f......
                        ..ffffff6fffff..
                        .ff7777777777ff.
                        ff7d7d7d7d7dddff
                        f7d7dfd7d7fddddf
                        fd7dfffd7fffdddf
                        f7d7fdfddfdfdddf
                        fddddddddddddddf
                        fdfffdffffdfffdf
                        fdffffffffffffdf
                        fddffffffffffddf
                        .fddddddddddddf.
                        ..ffffffffffff..
                        ...7676667666...
                        ....67....67....
                        5555555555555555
                        ................
                        .55555555555555.
                        `)
                }
                if (playerThreeSelection == 3) {
                    sprite.setImage(img`
                        ...........b....
                        .....111111b....
                        ...111fffff11...
                        ..11ffffffff11..
                        ..1fff9ff9fff1..
                        ..1fff9ff9fff1..
                        ..11ffffffff11..
                        ...111ffff111...
                        ..8..111111..8..
                        .8889..11..9888.
                        .18881111118881.
                        .1.1111111111.1.
                        .1..11111111.d1d
                        .e....8888...d1d
                        e.e...1111...d9d
                        e.e..111111...1.
                        .....1beeb1.....
                        5555555555555555
                        ................
                        .55555555555555.
                        `)
                }
                if (!(inMenu)) {
                    sprites.destroy(sprite)
                }
            })
        }
        if (index == 3) {
            spriteutils.onSpriteUpdateInterval(propSprite, 100, function (sprite) {
                if (playerFourSelection == -1) {
                    sprite.setImage(assets.image`noSelectionFour`)
                }
                if (playerFourSelection == 0) {
                    sprite.setImage(img`
                        ................
                        .....212222.....
                        ...2222221222...
                        ..222122222212..
                        .21222222222222.
                        2222fff11fff1222
                        1221f1f11f1f2221
                        2222ddd11ddd2222
                        .22111111111121.
                        ...1111111111...
                        ....11fff111....
                        ..111111111111..
                        ..1.1dddddd1.1..
                        ..1.1dddddd1.1..
                        ..1.dd....dd.1..
                        ....d......d....
                        ....d......d....
                        7777777777777777
                        ................
                        .77777777777777.
                        `)
                }
                if (playerFourSelection == 1) {
                    sprite.setImage(img`
                        ................
                        ................
                        ................
                        ................
                        ................
                        ........888.....
                        .......89998....
                        ......8999998...
                        .....89999998...
                        .ddd.899999ddd..
                        d111d99999d111d.
                        d1f1d99999d1f1d8
                        d1f1d99999d1f1d8
                        d111d95555d111d.
                        .ddd8852258ddd..
                        .89999555599998.
                        8888888888888888
                        7777777777777777
                        ................
                        .77777777777777.
                        `)
                }
                if (playerFourSelection == 2) {
                    sprite.setImage(img`
                        ................
                        ........f.......
                        .......f6f......
                        ..ffffff6fffff..
                        .ff7777777777ff.
                        ff7d7d7d7d7dddff
                        f7d7dfd7d7fddddf
                        fd7dfffd7fffdddf
                        f7d7fdfddfdfdddf
                        fddddddddddddddf
                        fdfffdffffdfffdf
                        fdffffffffffffdf
                        fddffffffffffddf
                        .fddddddddddddf.
                        ..ffffffffffff..
                        ...7676667666...
                        ....67....67....
                        7777777777777777
                        ................
                        .77777777777777.
                        `)
                }
                if (playerFourSelection == 3) {
                    sprite.setImage(img`
                        ...........b....
                        .....111111b....
                        ...111fffff11...
                        ..11ffffffff11..
                        ..1fff9ff9fff1..
                        ..1fff9ff9fff1..
                        ..11ffffffff11..
                        ...111ffff111...
                        ..8..111111..8..
                        .8889..11..9888.
                        .18881111118881.
                        .1.1111111111.1.
                        .1..11111111.d1d
                        .e....8888...d1d
                        e.e...1111...d9d
                        e.e..111111...1.
                        .....1beeb1.....
                        7777777777777777
                        ................
                        .77777777777777.
                        `)
                }
                if (!(inMenu)) {
                    sprites.destroy(sprite)
                }
            })
        }
    }
}
sprites.onOverlap(SpriteKind.cursor, SpriteKind.playerSelect, function (sprite, otherSprite) {
    if (0 == sprites.allOfKind(SpriteKind.cursor).indexOf(sprite)) {
        if (controller.A.isPressed()) {
            playerOneSelection = sprites.allOfKind(SpriteKind.playerSelect).indexOf(otherSprite)
        }
    }
    if (1 == sprites.allOfKind(SpriteKind.cursor).indexOf(sprite)) {
        if (controller.player2.isPressed(ControllerButton.A)) {
            playerTwoSelection = sprites.allOfKind(SpriteKind.playerSelect).indexOf(otherSprite)
        }
    }
    if (2 == sprites.allOfKind(SpriteKind.cursor).indexOf(sprite)) {
        if (controller.player3.isPressed(ControllerButton.A)) {
            playerThreeSelection = sprites.allOfKind(SpriteKind.playerSelect).indexOf(otherSprite)
        }
    }
    if (3 == sprites.allOfKind(SpriteKind.cursor).indexOf(sprite)) {
        if (controller.player4.isPressed(ControllerButton.A)) {
            playerFourSelection = sprites.allOfKind(SpriteKind.playerSelect).indexOf(otherSprite)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.attackTwo, function (sprite, otherSprite) {
    if (!(invinceOne)) {
        playerAttacked(sprite, otherSprite, 1, playerTwoSelection, playerTwoSprite, playerOneSelection)
    }
})
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (playerExists(4) && !(attackingFour)) {
        if (99 < statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerFourSprite).value) {
            if (attackTypeList[playerFourSelection] == 1) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerFourSprite).value += -100
                attackSprite = sprites.create(assets.image`nullImage`, SpriteKind.attackFour)
                attackSprite.z = 2
                animation.runImageAnimation(
                attackSprite,
                attackAnimList[playerFourSelection],
                100,
                true
                )
                if (playerFourSelection == 0) {
                    attackSprite.lifespan = 3500
                    attackSprite.fx = 30
                    attackSprite.fy = 30
                    attackSprite.setFlag(SpriteFlag.DestroyOnWall, true)
                    attackingFour = true
                    extraEffects.createSpreadEffectOnAnchor(attackSprite, poisinEffect, 4000, 70, 8)
                    playerThrow(playerHitboxFour, playerFourSprite, attackSprite, attackSpeedList[playerFourSelection], false)
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerFourSprite).setColor(4, 15, 1)
                    timer.background(function () {
                        pause(400)
                        attackingFour = false
                    })
                }
                if (playerFourSelection == 1) {
                    playerThrow(playerHitboxFour, playerFourSprite, attackSprite, attackSpeedList[playerFourSelection], true)
                    attackSprite.lifespan = 1800
                    attackSprite.setFlag(SpriteFlag.DestroyOnWall, true)
                    extraEffects.createSpreadEffectOnAnchor(attackSprite, fireEffect, 2800, 8, 35)
                    attackingFour = true
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerFourSprite).setColor(4, 15, 1)
                    timer.background(function () {
                        pause(600)
                        attackingFour = false
                    })
                }
            }
            if (attackTypeList[playerFourSelection] == 2) {
                attackingFour = true
            }
            if (attackTypeList[playerFourSelection] == 3) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerFourSprite).value += -100
                shotgun(7, 35, 4, 3, playerHitboxFour, playerFourSprite)
            }
        }
    }
})
function regenPlayerStatus (playerObject: Sprite, selection: number, attacking: boolean) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerObject).value += ammoRegenSpeed[selection]
    if (playerOneSelection == 3) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerObject).value += 4
    }
    if (99 < statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerObject).value) {
        if (attacking) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerObject).setColor(4, 15, 1)
        } else {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerObject).setColor(5, 15, 1)
        }
    } else {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerObject).setColor(1, 15, 1)
    }
    if (99 < statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerObject).value) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerObject).setColor(3, 15, 1)
    } else {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, playerObject).setColor(10, 15, 1)
    }
}
function playerAttacked (attacked: Sprite, weaponSprite: Sprite, victumNum: number, attackerSelection: number, attackerSprite: Sprite, victumSelection: number) {
    damagePlayer(attacked, attackerSprite, victumNum, weaponSprite, attackerSelection)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, attackerSprite).value += superChargeList[attackerSelection]
    statusbars.getStatusBarAttachedTo(StatusBarKind.Magic, attacked).value += superChargeList[victumSelection] / 3
}
sprites.onOverlap(SpriteKind.summonThree, SpriteKind.attackTwo, function (sprite, otherSprite) {
    damageSummon(playerTwoSelection, otherSprite, sprite)
})
function loadEffects () {
    poisinEffect = extraEffects.createCustomSpreadEffectData(
    [
    10,
    10,
    3
    ],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Twinkle),
    extraEffects.createPercentageRange(0, 0),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createTimeRange(500, 1000)
    )
    poisinRingEffect = extraEffects.createCustomSpreadEffectData(
    [10, 3],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Twinkle),
    extraEffects.createPercentageRange(100, 100),
    extraEffects.createPercentageRange(100, 100),
    extraEffects.createTimeRange(500, 1000)
    )
    fireEffect = extraEffects.createCustomSpreadEffectData(
    [
    5,
    4,
    2
    ],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Cloud),
    extraEffects.createPercentageRange(100, 100),
    extraEffects.createPercentageRange(100, 100),
    extraEffects.createTimeRange(500, 1000),
    0,
    0,
    extraEffects.createPercentageRange(50, 100),
    10,
    5,
    200
    )
    hatTeleportEffect = extraEffects.createCustomSpreadEffectData(
    [
    9,
    9,
    3,
    10
    ],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Spark),
    extraEffects.createPercentageRange(100, 100),
    extraEffects.createPercentageRange(100, 100),
    extraEffects.createTimeRange(500, 1000),
    0,
    0,
    extraEffects.createPercentageRange(50, 100),
    0,
    29,
    200
    )
    thunderEffect = extraEffects.createCustomSpreadEffectData(
    [
    1,
    9,
    1,
    6,
    1,
    8,
    1
    ],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Spark),
    extraEffects.createPercentageRange(100, 100),
    extraEffects.createPercentageRange(100, 100),
    extraEffects.createTimeRange(300, 600),
    0,
    0,
    extraEffects.createPercentageRange(50, 100),
    0,
    0,
    500
    )
}
controller.player3.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (playerExists(3) && !(attackingThree)) {
        if (99 < statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerThreeSprite).value) {
            if (attackTypeList[playerThreeSelection] == 1) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerThreeSprite).value += -100
                attackSprite = sprites.create(assets.image`nullImage`, SpriteKind.attackThree)
                attackSprite.z = 2
                animation.runImageAnimation(
                attackSprite,
                attackAnimList[playerThreeSelection],
                100,
                true
                )
                if (playerThreeSelection == 0) {
                    attackSprite.lifespan = 3500
                    attackSprite.fx = 30
                    attackSprite.fy = 30
                    attackSprite.setFlag(SpriteFlag.DestroyOnWall, true)
                    attackingThree = true
                    extraEffects.createSpreadEffectOnAnchor(attackSprite, poisinEffect, 4000, 70, 8)
                    playerThrow(playerHitboxThree, playerThreeSprite, attackSprite, attackSpeedList[playerThreeSelection], false)
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerThreeSprite).setColor(4, 15, 1)
                    timer.background(function () {
                        pause(400)
                        attackingThree = false
                    })
                }
                if (playerThreeSelection == 1) {
                    playerThrow(playerHitboxThree, playerThreeSprite, attackSprite, attackSpeedList[playerThreeSelection], true)
                    attackSprite.lifespan = 1800
                    attackSprite.setFlag(SpriteFlag.DestroyOnWall, true)
                    extraEffects.createSpreadEffectOnAnchor(attackSprite, fireEffect, 2800, 8, 35)
                    attackingThree = true
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerThreeSprite).setColor(4, 15, 1)
                    timer.background(function () {
                        pause(600)
                        attackingThree = false
                    })
                }
            }
            if (attackTypeList[playerThreeSelection] == 2) {
                attackingThree = true
            }
            if (attackTypeList[playerThreeSelection] == 3) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, playerThreeSprite).value += -100
                shotgun(7, 35, 3, 3, playerHitboxThree, playerThreeSprite)
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.attackFour, function (sprite, otherSprite) {
    if (!(invinceOne)) {
        playerAttacked(sprite, otherSprite, 1, playerFourSelection, playerFourSprite, playerOneSelection)
    }
})
sprites.onOverlap(SpriteKind.summonTwo, SpriteKind.attackFour, function (sprite, otherSprite) {
    damageSummon(playerFourSelection, otherSprite, sprite)
})
function equipSycthe (wieldingSprite: Sprite, playerNumber: number) {
    for (let index = 0; index < 3; index++) {
        syctheSprite = sprites.create(assets.image`syctheImage`, SpriteKind.prop)
        syctheSprite.z = 4
        syctheSprite.setFlag(SpriteFlag.GhostThroughWalls, true)
        spriteutils.onSpriteUpdateInterval(syctheSprite, 1100, function (sprite) {
            if (!(playerAttacking(playerNumber))) {
                timer.after(100, function () {
                    if (!(playerAttacking(playerNumber))) {
                        animation.runImageAnimation(
                        sprite,
                        assets.animation`syctheIdle`,
                        100,
                        false
                        )
                    }
                })
            }
        })
        spriteutils.onSpriteUpdateInterval(syctheSprite, 400, function (sprite) {
            if (playerAttacking(playerNumber)) {
                animation.runImageAnimation(
                sprite,
                [img`
                    . . . . . . . . . . . . . a . . 
                    . . . . . . . . . . . . a 3 3 . 
                    . . . . . . . . . . . a . 3 3 3 
                    . . . . . . . . . . a . . 3 3 3 
                    . . . . . . . . . a . . . 3 3 3 
                    . . . . . . . . a . . . . . 3 3 
                    . . . . . . . . a . . . . . 3 3 
                    . . . . . . . a . . . . . 3 3 . 
                    . . . . . . a . . . . . . . . . 
                    . . . . . a . . . . . . . . . . 
                    . . . . a . . . . . . . . . . . 
                    . . . a . . . . . . . . . . . . 
                    . . . a . . . . . . . . . . . . 
                    . . a . . . . . . . . . . . . . 
                    . a . . . . . . . . . . . . . . 
                    a . . . . . . . . . . . . . . . 
                    `,img`
                    a . . . . . . . . . . . . . . . 
                    . a . . . . . . . . . . . . . . 
                    . . a . . . . . . . . . . . . . 
                    . . . a a . . . . . . . . . . . 
                    . . . . . a . . . . . . . . . . 
                    . . . . . . a . . . . . . . . . 
                    . . . . . . . a . . . . . . . . 
                    . . . . . . . . a . . . . . . . 
                    . . . . . . . . . a a . . . . . 
                    . . . . . . . . . . . a . . . . 
                    . . . . . . . . . . . . a . . . 
                    . . . . . . . . . . . . . a . . 
                    . . . . . . . . . . . . . . a . 
                    . . . . . . . . 3 . . 3 3 3 3 a 
                    . . . . . . . . 3 3 3 3 3 3 3 . 
                    . . . . . . . . . 3 3 3 3 3 . . 
                    `,img`
                    . . . . . . . . . . . . . . . a 
                    . . . . . . . . . . . . . . a . 
                    . . . . . . . . . . . . . a . . 
                    . . . . . . . . . . . . a . . . 
                    . . . . . . . . . . . . a . . . 
                    . . . . . . . . . . . a . . . . 
                    . . . . . . . . . . a . . . . . 
                    . . . . . . . . . a . . . . . . 
                    . 3 3 . . . . . a . . . . . . . 
                    3 3 . . . . . a . . . . . . . . 
                    3 3 . . . . . a . . . . . . . . 
                    3 3 3 . . . a . . . . . . . . . 
                    3 3 3 . . a . . . . . . . . . . 
                    3 3 3 . a . . . . . . . . . . . 
                    . 3 3 a . . . . . . . . . . . . 
                    . . a . . . . . . . . . . . . . 
                    `,img`
                    . . 3 3 3 3 3 . . . . . . . . . 
                    . 3 3 3 3 3 3 3 . . . . . . . . 
                    a 3 3 3 3 . . 3 . . . . . . . . 
                    . a . . . . . . . . . . . . . . 
                    . . a . . . . . . . . . . . . . 
                    . . . a . . . . . . . . . . . . 
                    . . . . a . . . . . . . . . . . 
                    . . . . . a a . . . . . . . . . 
                    . . . . . . . a . . . . . . . . 
                    . . . . . . . . a . . . . . . . 
                    . . . . . . . . . a . . . . . . 
                    . . . . . . . . . . a . . . . . 
                    . . . . . . . . . . . a a . . . 
                    . . . . . . . . . . . . . a . . 
                    . . . . . . . . . . . . . . a . 
                    . . . . . . . . . . . . . . . a 
                    `],
                100,
                true
                )
                if (playerNumber == 1) {
                    sprite.setKind(SpriteKind.attackOne)
                }
                if (playerNumber == 2) {
                    sprite.setKind(SpriteKind.attackTwo)
                }
                if (playerNumber == 3) {
                    sprite.setKind(SpriteKind.attackThree)
                }
                if (playerNumber == 4) {
                    sprite.setKind(SpriteKind.attackFour)
                }
            }
        })
        spriteutils.onSpriteUpdateInterval(syctheSprite, 50, function (sprite) {
            if (playerAttacking(playerNumber) && statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, wieldingSprite).value > 50) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, wieldingSprite).value += -5
                if (playerNumber == 1) {
                    spriteutils.placeAngleFrom(
                    sprite,
                    spriteutils.degreesToRadians(sine + sprites.allOfKind(SpriteKind.attackOne).indexOf(sprite) * 120),
                    20,
                    wieldingSprite
                    )
                }
                if (playerNumber == 2) {
                    spriteutils.placeAngleFrom(
                    sprite,
                    spriteutils.degreesToRadians(sine + sprites.allOfKind(SpriteKind.attackTwo).indexOf(sprite) * 120),
                    20,
                    wieldingSprite
                    )
                }
                if (playerNumber == 3) {
                    spriteutils.placeAngleFrom(
                    sprite,
                    spriteutils.degreesToRadians(sine + sprites.allOfKind(SpriteKind.attackThree).indexOf(sprite) * 120),
                    20,
                    wieldingSprite
                    )
                }
                if (playerNumber == 4) {
                    spriteutils.placeAngleFrom(
                    sprite,
                    spriteutils.degreesToRadians(sine + sprites.allOfKind(SpriteKind.attackFour).indexOf(sprite) * 120),
                    20,
                    wieldingSprite
                    )
                }
            } else {
                spriteutils.moveTo(sprite, spriteutils.pos(wieldingSprite.x, wieldingSprite.y - 45), 500)
                sprite.setKind(SpriteKind.prop)
                if (playerNumber == 1) {
                    attackingOne = false
                }
                if (playerNumber == 2) {
                    attackingTwo = false
                }
                if (playerNumber == 3) {
                    attackingThree = false
                }
                if (playerNumber == 4) {
                    attackingFour = false
                }
            }
            if (!(playerExists(playerNumber))) {
                sprites.destroy(sprite)
            }
        })
    }
}
sprites.onOverlap(SpriteKind.summonOne, SpriteKind.attackThree, function (sprite, otherSprite) {
    damageSummon(playerThreeSelection, otherSprite, sprite)
})
sprites.onOverlap(SpriteKind.summonOne, SpriteKind.attackTwo, function (sprite, otherSprite) {
    damageSummon(playerTwoSelection, otherSprite, sprite)
})
sprites.onOverlap(SpriteKind.summonFour, SpriteKind.attackOne, function (sprite, otherSprite) {
    damageSummon(playerOneSelection, otherSprite, sprite)
})
sprites.onOverlap(SpriteKind.playerThree, SpriteKind.attackFour, function (sprite, otherSprite) {
    if (!(invinceThree)) {
        playerAttacked(sprite, otherSprite, 3, playerFourSelection, playerFourSprite, playerThreeSelection)
    }
})
sprites.onOverlap(SpriteKind.summonThree, SpriteKind.attackFour, function (sprite, otherSprite) {
    damageSummon(playerFourSelection, otherSprite, sprite)
})
sprites.onOverlap(SpriteKind.summonThree, SpriteKind.attackOne, function (sprite, otherSprite) {
    damageSummon(playerOneSelection, otherSprite, sprite)
})
let sine = 0
let syctheSprite: Sprite = null
let selectionSprite: Sprite = null
let menuText: TextSprite = null
let startButton: Sprite = null
let cursorSprite: Sprite = null
let hatTeleportEffect: SpreadEffectData = null
let damageText: TextSprite = null
let poisinRingEffect: SpreadEffectData = null
let statusbar: StatusBarSprite = null
let playerCount = 0
let inviceFour = false
let thunderEffect: SpreadEffectData = null
let upAnimList: Image[][] = []
let leftAnimList: Image[][] = []
let rightAnimList: Image[][] = []
let downAnimList: Image[][] = []
let upMoveAnimList: Image[][] = []
let leftMoveAnimList: Image[][] = []
let rightMoveAnimList: Image[][] = []
let downMoveAnimList: Image[][] = []
let healthList: number[] = []
let superChargeList: number[] = []
let ammoRegenSpeed: number[] = []
let ammoList: number[] = []
let playerSpeedList: number[] = []
let propSprite: Sprite = null
let damageList: number[] = []
let damageTaken = 0
let fireEffect: SpreadEffectData = null
let attackSpeedList: number[] = []
let attackAnimList: Image[][] = []
let attackTypeList: number[] = []
let invinceTwo = false
let playerHitboxOne: Sprite = null
let playerOneSprite: Sprite = null
let attackingOne = false
let playerHitboxFour: Sprite = null
let playerFourSprite: Sprite = null
let invinceOne = false
let summonerBar: StatusBarSprite = null
let attackSprite: Sprite = null
let playerHitboxTwo: Sprite = null
let attackingTwo = false
let playerHitboxThree: Sprite = null
let playerThreeSprite: Sprite = null
let attackingThree = false
let attackingFour = false
let inMenu = false
let poisinEffect: SpreadEffectData = null
let bulletSprite: Sprite = null
let playerTwoSprite: Sprite = null
let invinceThree = false
let playerFourDead = false
let playerFourSelection = 0
let playerThreeDead = false
let playerThreeSelection = 0
let playerTwoDead = false
let playerTwoSelection = 0
let playerOneDead = false
let playerOneSelection = 0
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 400
    export const ARCADE_SCREEN_HEIGHT = 300
}
loadEffects()
playerAttributeArrays()
playerOneSelection = 0
playerOneDead = false
playerTwoSelection = -1
playerTwoDead = false
playerThreeSelection = -1
playerThreeDead = false
playerFourSelection = -1
playerFourDead = false
selectScreen()
game.onUpdate(function () {
    if (playerExists(1)) {
        playerOneSprite.setPosition(playerHitboxOne.x, playerHitboxOne.y)
    }
    if (playerExists(2)) {
        playerTwoSprite.setPosition(playerHitboxTwo.x, playerHitboxTwo.y)
    }
    if (playerExists(3)) {
        playerThreeSprite.setPosition(playerHitboxThree.x, playerHitboxThree.y)
    }
    if (playerExists(4)) {
        playerFourSprite.setPosition(playerHitboxFour.x, playerHitboxFour.y)
    }
    tickCamrea()
})
game.onUpdateInterval(50, function () {
    sine += 15
    if (sine > 259) {
        sine = 0
    }
})
game.onUpdateInterval(300, function () {
	
})
game.onUpdateInterval(200, function () {
    if (playerExists(1)) {
        regenPlayerStatus(playerOneSprite, playerOneSelection, attackingOne)
    }
    if (playerExists(2)) {
        regenPlayerStatus(playerTwoSprite, playerTwoSelection, attackingTwo)
    }
    if (playerExists(3)) {
        regenPlayerStatus(playerThreeSprite, playerThreeSelection, attackingThree)
    }
    if (playerExists(4)) {
        regenPlayerStatus(playerFourSprite, playerFourSelection, attackingFour)
    }
})
