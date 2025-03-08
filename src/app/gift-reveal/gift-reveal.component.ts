import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { GiftService } from '../gift.service';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-gift-reveal',
  templateUrl: './gift-reveal.component.html',
  styleUrls: ['./gift-reveal.component.scss']
})
export class GiftRevealComponent implements OnInit, OnDestroy {
  @ViewChild('giftAnimation') giftAnimation!: ElementRef;
  
  isGiftVisible = false;
  currentMessage = '';
  flowers = ['🌸', '🌺', '🌹', '🌷', '💐', '🌼'];
  private fireworksInterval: any;
  
  // Heart shape positions in the grid
  heartPositions = [
    // Top of heart
    '2/4/3/5', '2/5/3/6', '2/6/3/7', '2/7/3/8',
    // Upper curves
    '3/3/4/4', '3/4/4/5', '3/5/4/6', '3/6/4/7', '3/7/4/8', '3/8/4/9',
    '4/2/5/3', '4/3/5/4', '4/4/5/5', '4/5/5/6', '4/6/5/7', '4/7/5/8', '4/8/5/9', '4/9/5/10',
    // Middle section
    '5/2/6/3', '5/3/6/4', '5/4/6/5', '5/5/6/6', '5/6/6/7', '5/7/6/8', '5/8/6/9', '5/9/6/10',
    '6/3/7/4', '6/4/7/5', '6/5/7/6', '6/6/7/7', '6/7/7/8', '6/8/7/9',
    // Bottom curves
    '7/4/8/5', '7/5/8/6', '7/6/8/7', '7/7/8/8',
    '8/5/9/6', '8/6/9/7'
  ];

  constructor(private giftService: GiftService) {}

  ngOnInit(): void {
    this.startBackgroundFireworks();
  }

  ngOnDestroy(): void {
    if (this.fireworksInterval) {
      clearInterval(this.fireworksInterval);
    }
  }

  revealGift(): void {
    this.isGiftVisible = true;
    this.currentMessage = '💝 Chúc bạn luôn vui tươi, tràn đầy năng lượng và thành công trong cuộc sống! 💝';
    this.createCenterFlower();
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

  private createCenterFlower(): void {
    const container = this.giftAnimation.nativeElement;
    container.innerHTML = '';

    const flower = document.createElement('div');
    flower.className = 'center-flower';

    // Create main flower petals
    for (let i = 0; i < 12; i++) {
      const petal = document.createElement('div');
      petal.className = 'center-petal';
      petal.style.transform = `rotate(${i * 30}deg)`;
      flower.appendChild(petal);
    }

    // Create flower center
    const center = document.createElement('div');
    center.className = 'flower-center';
    flower.appendChild(center);

    container.appendChild(flower);

    // Add animation class after a small delay to trigger the animation
    setTimeout(() => {
      flower.style.opacity = '1';
    }, 100);
  }
}
