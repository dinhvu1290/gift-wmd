import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { GiftService } from '../gift.service';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-gift-reveal',
  templateUrl: './gift-reveal.component.html',
  styleUrls: ['./gift-reveal.component.scss']
})
export class GiftRevealComponent implements OnInit, OnDestroy {
  @ViewChild('giftAnimation', { static: true }) giftAnimation!: ElementRef;
  
  isGiftVisible = false;
  currentMessage = '';
  flowers = ['🌸', '🌺', '🌹', '🌷', '💐', '🌼', '🌻'];
  private fireworksInterval: any;

  constructor(private giftService: GiftService) {}

  ngOnInit(): void {
    this.startBackgroundFireworks();
  }

  ngOnDestroy(): void {
    if (this.fireworksInterval) {
      clearInterval(this.fireworksInterval);
    }
  }

  randomFlower(): string {
    return this.flowers[Math.floor(Math.random() * this.flowers.length)];
  }

  revealGift(): void {
    const gift = this.giftService.getRandomGift();
    this.isGiftVisible = true;
    this.currentMessage = gift.message;

    // Clear previous animation
    this.giftAnimation.nativeElement.innerHTML = '';
    
    // Create new animation
    gift.create(this.giftAnimation.nativeElement);
  }

  tryAgain(): void {
    this.isGiftVisible = false;
    this.currentMessage = '';
    this.giftAnimation.nativeElement.innerHTML = '';
  }

  private startBackgroundFireworks(): void {
    this.fireworksInterval = setInterval(() => {
      this.launchFirework();
    }, 2000);
  }

  private launchFirework(): void {
    const colors = ['#ff69b4', '#ff1493', '#ff69b4', '#ffb6c1', '#ffc0cb'];
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: Math.random(), y: Math.random() },
      colors: colors,
      ticks: 300,
      gravity: 0.8,
      scalar: 1.2,
      startVelocity: 30,
      shapes: ['star']
    });
  }
}
